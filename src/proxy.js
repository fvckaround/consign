import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Only guard /admin routes
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const loginUrl = new URL("/admin-login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};