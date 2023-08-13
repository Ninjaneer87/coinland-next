import { fetchGlobalsCMC } from "@/lib/v1/fetchers";
import { responseHeaders } from "@/utils/constants";
import { NextResponse } from "next/server";

export async function GET() {
  const globals = await fetchGlobalsCMC();

  if (globals.status.error_message) {
    return new Error(globals.status.error_message);
  }

  return new NextResponse(JSON.stringify(globals), {
    headers: responseHeaders,
  });
}
