// app/api/images/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";

  try {
    const response = await axios.get("https://api.unsplash.com/photos", {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
      },
      params: {
        per_page: 10, // 페이지당 가져올 이미지 수
        page: page, // 페이지 번호
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}
