import { fetchGlobals } from "@/app/lib/fetchers";
import { responseHeaders } from "@/utils/config";
import { NextResponse } from "next/server";

export async function GET() {
  const globals = await fetchGlobals();

  if (globals.status.error_message) {
    return new Error(globals.status.error_message);
  }

  return new NextResponse(JSON.stringify(globals), {
    headers: responseHeaders,
  });
}
