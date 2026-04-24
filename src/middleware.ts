import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isAuth = !!req.auth;
  const { pathname } = req.nextUrl;
  const user = req.auth?.user as any;

  // 1. Protection for /admin routes
  if (pathname.startsWith("/admin")) {
    if (!isAuth) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    if (!user?.isFounder) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // 2. Protection for /dashboard and /app routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/app")) {
    if (!isAuth) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    if (user?.isSuspended && !pathname.includes("/auth/logout")) {
      return NextResponse.redirect(new URL("/auth/login?error=AccountSuspended", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/auth/:path*", "/app/:path*"],
};
