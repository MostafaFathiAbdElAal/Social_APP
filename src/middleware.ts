import { NextResponse, NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  // Current URL
  const pathName = req.nextUrl.pathname;
  const guestRoutes = ["/login", "/signup"];
  const protectedRoutes = ["/"];

  if (protectedRoutes.some((route) => pathName.includes(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (guestRoutes.includes(pathName)) {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!login|signup))",
  ],
};

