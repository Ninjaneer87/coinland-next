import { API_URLS, allowedOrigins } from "@/utils/constants";

const APIKEY = process.env.APIKEY as string;
const { coinsUrl, metadataUrl, globalsUrl } = API_URLS.v1;
const config: RequestInit = {
  headers: {
    "X-CMC_PRO_API_KEY": APIKEY,
    Accept: "application/json",
    "Access-Control-Allow-Origin": `${allowedOrigins}`,
  },
};

export async function getCoinsCMC() {
  const res = await fetch(`${coinsUrl}?convert=USD`, config);
  const coins: CoinsResponseCMC = await res.json();
  return coins;
}

export async function fetchMetadataCMC(ids: number[]) {
  const res = await fetch(`${metadataUrl}?id=${ids}`, config);
  const metadata: MetadataResponseCMC = await res.json();
  return metadata;
}

export async function fetchGlobalsCMC() {
  const res = await fetch(`${globalsUrl}?convert=USD`, config);
  const globals: GlobalsResponseCMC = await res.json();
  return globals;
}
