import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect all /admin routes except /admin/login
  if (path.startsWith("/admin") && path !== "/admin/login") {
    const token = request.cookies.get("admin_token")?.value;
    if (token !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Redirect authenticated users away from login page
  if (path === "/admin/login") {
    const token = request.cookies.get("admin_token")?.value;
    if (token === "authenticated") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // Redirect root /admin to dashboard
  if (path === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
