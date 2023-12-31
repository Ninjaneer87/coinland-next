import { fetchMetadataCMC } from "@/lib/v1/fetchers";
import { responseHeaders } from "@/utils/constants";
import { NextResponse } from "next/server";

type RequestBody = {
  ids: number[];
};
export async function POST(request: Request) {
  const { ids }: RequestBody = await request.json();
  if (!ids) {
    return new Error("No ids provided");
  }

  const metadata = await fetchMetadataCMC(ids);

  if (metadata.status.error_message) {
    return new Error(metadata.status.error_message);
  }

  return new NextResponse(JSON.stringify(metadata), {
    headers: responseHeaders,
  });
}
