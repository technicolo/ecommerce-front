// app/api/session/route.ts
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const token = req.cookies.get("token");

  if (!token) {
    return NextResponse.json({ message: "No autenticado" }, { status: 401 });
  }

  return NextResponse.json({ message: "Autenticado" });
}
