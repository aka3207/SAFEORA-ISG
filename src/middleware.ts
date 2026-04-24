import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isAuth = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const user = req.auth?.user as any;
  const role = user?.role;
  const isFounder = user?.isFounder;
  const isSuspended = user?.isSuspended;

  if (isSuspended) {
    return NextResponse.redirect(new URL("/auth/login?error=AccountSuspended", req.url));
  }

  if (isAuthPage) {
    if (isAuth) {
      if (isFounder) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  if (!isAuth && !isAuthPage) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }
    return NextResponse.redirect(
      new URL(`/auth/login?from=${encodeURIComponent(from)}`, req.url)
    );
  }

  // Role-based protection for Owner Console
  if (req.nextUrl.pathname.startsWith("/admin") && !isFounder) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/dashboard") && isFounder) {
    // Optionally redirect founder to admin if they try to access tenant dashboard
    // But maybe let them see it too? The request says "No normal customer should ever see this panel."
    // and "This is hidden owner-level infrastructure."
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/auth/:path*", "/app/:path*"],
};
