import { getCoinsCMC } from "@/lib/v1/fetchers";
import { responseHeaders } from "@/utils/constants";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const coins = await getCoinsCMC();

  if (coins.status.error_message) {
    return new Error(coins.status.error_message);
  }

  return new NextResponse(JSON.stringify(coins), {
    headers: responseHeaders,
  });
}
