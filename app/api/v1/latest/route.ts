import { fetchCoins, fetchMetadata } from "@/app/lib/fetchers";
import { responseHeaders } from "@/utils/config";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const origin = request.headers.get("origin");
  const coins = await fetchCoins();

  if (coins.status.error_message) {
    return new Error(coins.status.error_message);
  }

  return new NextResponse(JSON.stringify(coins), {
    headers: responseHeaders,
  });
}
