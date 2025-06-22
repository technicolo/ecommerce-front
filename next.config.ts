import type { NextConfig } from "next";

const nextConfig = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};

module.exports = nextConfig;


export default nextConfig;
