import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

    if (isAuthPage) {
      if (isAuth) {
        // Redirect based on role if trying to access auth pages while logged in
        if (token.role === "SUPER_ADMIN") {
          return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return null;
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      return NextResponse.redirect(
        new URL(`/auth/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }

    // Role-based protection
    if (req.nextUrl.pathname.startsWith("/admin") && token.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/app") && token.role === "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => true, // handled inside middleware function
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/auth/:path*", "/app/:path*"],
};
