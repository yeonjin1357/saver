// app/api/images/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;

export async function GET(req: NextRequest) {
  try {
    const response = await axios.get("https://api.unsplash.com/photos/random", {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
      },
      params: {
        count: 10, // 가져올 이미지 수
      },
    });

    // response.data가 배열인지 확인하고, 배열이 아닌 경우 배열로 변환
    const images = Array.isArray(response.data) ? response.data : [response.data];

    const formattedImages = images.map((image: any) => ({
      id: image.id,
      urls: image.urls,
      alt_description: image.alt_description || "No description available",
    }));

    return NextResponse.json(formattedImages);
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}
