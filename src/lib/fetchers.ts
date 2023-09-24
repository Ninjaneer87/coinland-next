import { composeUrl } from "@/utils/common";
import { API_URLS } from "@/utils/constants";

const { coinsUrl, coinUrl, globalsUrl, allCoins } = API_URLS.v2;

export async function getCoins(page: number, perPage: number) {
  const endpoint = composeUrl(coinsUrl, {
    page: `${page}`,
    per_page: `${perPage}`,
    vs_currency: "usd",
    sparkline: "true",
    locale: "en",
  });

  try {
    const res = await fetch(endpoint);
    const coins: CoinItem[] & ErrorStatus = await res.json();
    return coins;
  } catch (error) {
    throw new Error("Failed to fetch coins");
  }
}

export async function getCoin(id: string) {
  const path = coinUrl.replace("{:id:}", id);
  const endpoint = composeUrl(path, {
    localization: "false",
    tickers: "false",
    market_data: "true",
    community_data: "true",
    developer_data: "true",
    sparkline: "true",
  });

  try {
    const res = await fetch(endpoint);
    const coin: Coin & ErrorStatus = await res.json();
    return coin;
  } catch (error) {
    throw new Error("Failed to fetch coin");
  }
}

export async function getGlobals() {
  const endpoint = composeUrl(globalsUrl);

  try {
    const res = await fetch(endpoint);
    const globals: Globals & ErrorStatus = await res.json();
    return globals;
  } catch (error) {
    throw new Error("Failed to fetch globals");
  }
}

export async function getAllCoins(page: number, perPage: number) {
  const endpoint = composeUrl(allCoins);

  try {
    const res = await fetch(endpoint);
    const coins: AllCoinsItem[] & ErrorStatus = await res.json();
    return coins;
  } catch (error) {
    throw new Error("Failed to fetch all coins");
  }
}
