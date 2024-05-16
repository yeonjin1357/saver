// app/api/related-images/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageId = searchParams.get("imageId") || "";

  try {
    const response = await axios.get(`https://api.unsplash.com/photos/${imageId}/related`, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
      },
      params: {
        per_page: 10,
      },
    });

    return NextResponse.json(response.data.results);
  } catch (error) {
    console.error("Error fetching related images:", error);
    return NextResponse.json({ error: "Failed to fetch related images" }, { status: 500 });
  }
}
