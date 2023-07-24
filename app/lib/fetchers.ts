import { API_URLS, allowedOrigins } from "@/utils/config";

const APIKEY = process.env.APIKEY as string;
const { coinsUrl, metadataUrl, globalsUrl } = API_URLS.v1;
const config: RequestInit = {
  headers: {
    "X-CMC_PRO_API_KEY": APIKEY,
    Accept: "application/json",
    "Access-Control-Allow-Origin": `${allowedOrigins}`,
  },
};

export async function fetchCoins() {
  const res = await fetch(`${coinsUrl}?convert=USD`, config);
  const coins: CoinsResponse = await res.json();

  return coins;
}

export async function fetchMetadata(ids: number[]) {
  const res = await fetch(`${metadataUrl}?id=${ids}`, config);
  const metadata: MetadataResponse = await res.json();

  return metadata;
}

export async function fetchGlobals() {
  const res = await fetch(`${globalsUrl}?convert=USD`, config);
  const globals: GlobalsResponse = await res.json();

  return globals;
}
