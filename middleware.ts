import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authTokens")?.value;

  const protectedRoutes = ["/productos", "/carrito", "/perfil"];
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/productos", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/productos", "/carrito", "/perfil", "/login"],
};
