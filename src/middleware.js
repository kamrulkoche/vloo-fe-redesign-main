import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

async function auth(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  console.log("Token exists:", !!token);
  console.log("secrect :", process.env.AUTH_SECRET);

  if (!token) return null;
  return {
    user: token,
    needsCompletion: token.needsCompletion,
  };
}

export default async function middleware(req) {
  const session = await auth(req);
  const user = session?.user;
  const pathname = req.nextUrl.pathname;
  console.log("Middleware running on path:", req.nextUrl.pathname);

  console.log("Session exists:", !!session);
  console.log("User exists:", !!session?.user);

  // Skip middleware for static assets and API routes
  if (
    pathname.includes("/_next") ||
    pathname.includes("/api") ||
    pathname.includes("/assets") ||
    pathname.includes("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // Handle profile completion flow
  if (
    session?.needsCompletion &&
    !pathname.includes("/complete-profile") &&
    !pathname.includes("/auth")
  ) {
    return NextResponse.redirect(new URL("/complete-profile", req.url));
  }
  // console.log({ user });
  // Handle authentication requirements
  if (!user) {
    // Public routes that don't require authentication
    const publicRoutes = ["/", "/auth", "/user-sign-up", "/host-sign-up"];
    const isPublicRoute = publicRoutes.some(
      (route) => pathname === route || pathname.startsWith("/auth/"),
    );

    if (
      !isPublicRoute &&
      (pathname.startsWith("/portal") || pathname.startsWith("/pro"))
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  }

  // Handle role-based access
  const userType = user.userType;

  if (userType === "User") {
    // Users cannot access /pro routes
    if (pathname.startsWith("/pro")) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Block access to sign-up routes if already logged in
    if (pathname === "/user-sign-up" || pathname === "/host-sign-up") {
      return NextResponse.redirect(new URL("/portal", req.url));
    }
  }

  if (userType === "Host") {
    // Hosts should stay within /pro
    if (pathname.startsWith("/portal") && !pathname.startsWith("/pro/portal")) {
      return NextResponse.redirect(new URL("/pro/portal", req.url));
    }

    // Block access to sign-up routes if already logged in
    if (pathname === "/user-sign-up" || pathname === "/host-sign-up") {
      return NextResponse.redirect(new URL("/pro/portal", req.url));
    }
  }

  return NextResponse.next();
}

// Define routes this middleware applies to
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)",
    "/pro/:path*",
    "/portal/:path*",
    "/pro/portal/:path*",
  ],
  runtime: "nodejs",
};
