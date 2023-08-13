import { type } from "os";

export const allowedOrigins = ["https://ninjaneer87.github.io"];

const cmcApiRootUrl = "https://pro-api.coinmarketcap.com/v1";
const geckoApiRootUrl = "https://api.coingecko.com/api/v3";

export const API_URLS = {
  v1: {
    coinsUrl: `${cmcApiRootUrl}/cryptocurrency/listings/latest`,
    metadataUrl: `${cmcApiRootUrl}/cryptocurrency/info`,
    globalsUrl: `${cmcApiRootUrl}/global-metrics/quotes/latest`,
  },
  v2: {
    coinsUrl: `${geckoApiRootUrl}/coins/markets`,
    coinUrl: `${geckoApiRootUrl}/coins/{:id:}`,
    globalsUrl: `${geckoApiRootUrl}/global`,
  },
};

export const ROUTES = {
  HOME: "/",
  COIN: (id: string) => `/coins/${id}`,
  COINS: "/coins",
} as const;

export const responseHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": `*`,
};

export const QUERY_CLIENT_KEYS = {
  COINS: "coins",
  COIN: "coin",
  GLOBALS: "globals",
} as const;
export type QueryClientKeys =
  (typeof QUERY_CLIENT_KEYS)[keyof typeof QUERY_CLIENT_KEYS];

export const QUERY_PARAMS = {
  PAGE: "page",
  PER_PAGE: "per_page",
  SEARCH: "search",
} as const;
export type QueryParams = (typeof QUERY_PARAMS)[keyof typeof QUERY_PARAMS];
