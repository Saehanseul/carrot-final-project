import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/create-account": true,
  "/login": true
};

export async function middleware(request: NextRequest) {
  console.log("middleware");

  const session = await getSession();
  const isPublicPath = publicOnlyUrls[request.nextUrl.pathname];
  console.log("session", session);
  if (!session.id) {
    if (!isPublicPath) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (isPublicPath) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
}

export const config = {
  // matcher: ["/", "/profile", "/createa-account", "/user/:path*"]
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"] // 왼쪽 파일만 제외하는 정규식
};
