import { NextResponse } from "next/server";
import { allowedOrigins } from "./utils/constants";

const isProduction = process.env.NODE_ENV === "production";

function middleware(request: Request) {
  const origin = request.headers.get("origin");

  if (
    (isProduction && origin && !allowedOrigins.includes(origin)) ||
    (isProduction && !origin)
  ) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request, blocked by CORS",
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  return NextResponse.next();
}

export default middleware;

export const config = {
  matcher: "/api/v1/:path*",
};
