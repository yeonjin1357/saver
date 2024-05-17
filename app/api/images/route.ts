// app/api/images/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;
const CACHE_MAX_AGE = 60 * 60 * 24; // 24시간

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";

  const cacheKey = `images:${page}`;
  const cache = await caches.open("my-cache");
  const cachedResponse = await cache.match(cacheKey);

  if (cachedResponse) {
    console.log("Cache hit for images");
    return cachedResponse;
  }

  try {
    const response = await axios.get("https://api.unsplash.com/photos", {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
      },
      params: {
        page,
        per_page: 10,
        order_by: "latest",
      },
    });

    const nextResponse = NextResponse.json(response.data);
    nextResponse.headers.set("Cache-Control", `max-age=${CACHE_MAX_AGE}, immutable`);

    await cache.put(cacheKey, nextResponse.clone());

    return nextResponse;
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}
