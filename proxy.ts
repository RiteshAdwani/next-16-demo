import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_ROUTES, ROUTES } from "@/constants/routes.constants";
import { CookieKeys } from "./constants/cookies.constants";

function isPublicPath(pathname: string) {
  if (PUBLIC_ROUTES.includes(pathname) || pathname === "") return true;
  return false;
}

export function proxy(request: NextRequest) {
  const basePath = request.nextUrl.basePath;
  const isAuth = Boolean(request.cookies.get(CookieKeys.USER));

  // If user is authenticated, prevent access to login/signup
  if (isAuth && (basePath === ROUTES.LOGIN || basePath === ROUTES.SIGNUP)) {
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  // If not authenticated and trying to access a protected route, redirect to login
  if (!isPublicPath(basePath) && !isAuth) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  return;
}
