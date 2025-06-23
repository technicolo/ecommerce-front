// app/api/carrito/route.ts

import { NextRequest, NextResponse } from "next/server";
import { fetchFromBackend } from "../utils/fetchFromBackend";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = req.cookies.get("token")?.value;

  const data = await fetchFromBackend("/api/carrito", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return NextResponse.json(data);
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const data = await fetchFromBackend("/api/carrito", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return NextResponse.json(data);
}
