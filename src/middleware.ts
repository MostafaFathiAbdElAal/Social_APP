import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathName = req.nextUrl.pathname;

  const PUBLIC_ROUTES = ["/login", "/signup"];

  const isPublic = PUBLIC_ROUTES.includes(pathName);

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublic && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api).*)"], 
};
