import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const res = NextResponse.json({ success: true });
  console.log("URL destino:", process.env.NEXT_PUBLIC_API_URL);
  (await cookies()).set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });

  return res;
}
