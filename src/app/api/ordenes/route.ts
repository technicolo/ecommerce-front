// app/api/ordenes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchFromBackend } from "../utils/fetchFromBackend";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = req.cookies.get("token")?.value;

    const data = await fetchFromBackend("/api/ordenes/confirmar", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Error inesperado" },
      { status: 500 }
    );
  }
}
