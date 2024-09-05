import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { pathname, search } = new URL(request.url);
  const path = pathname.replace(/^\/api/, "");
  const fullUrl = `http://localhost:3001${path}${search}`;

  console.log("Next.js API Route: Proxying request to:", fullUrl);

  try {
    const response = await fetch(fullUrl, {
      headers: {
        "X-Forwarded-Host": "localhost:3000",
        "X-Forwarded-Proto": "http",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Next.js API Route: Received data from backend");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Next.js API Route: Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

// Similar changes for POST and other methods...
