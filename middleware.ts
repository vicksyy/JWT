import { NextRequest, NextResponse } from "next/server";

import { getEdgeJwtCookieName, verifyEdgeToken } from "@/lib/auth-edge";

const protectedRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = request.cookies.get(getEdgeJwtCookieName())?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET no definida");
    }

    await verifyEdgeToken(token, secret);
    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete(getEdgeJwtCookieName());
    return response;
  }
}

export const config = {
  matcher: ["/dashboard/:path*"]
};
