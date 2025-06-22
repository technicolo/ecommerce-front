// /middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isAuth = !!token;
  const { pathname } = request.nextUrl;

  const isPublic = pathname.startsWith("/login") || pathname.startsWith("/register");

  if (!isAuth && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
