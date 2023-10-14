export const allowedOrigins = ["https://ninjaneer87.github.io"];
const coinlandV2Url = "https://coinland-next.vercel.app/";
const localhostUrl = "http://localhost:3000";

const cmcApiRootUrl = "https://pro-api.coinmarketcap.com/v1";
const geckoApiRootUrl = "https://api.coingecko.com/api/v3";
export const baseUrl =
  process.env.NODE_ENV === "production" ? coinlandV2Url : localhostUrl;

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
    allCoins: `${geckoApiRootUrl}/coins/list`,
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
} as const;
export type QueryParamsKeys = (typeof QUERY_PARAMS)[keyof typeof QUERY_PARAMS];
export type SearchParams = {
  searchParams?: Record<QueryParamsKeys, string | string[] | undefined>;
};
export type QueryParams = {
  page?: string;
  per_page?: string;
};

export const LOCAL_STORAGE_KEYS = {
  THEME: "theme",
  THEME_OPTION: "theme_option",
  PAGE: "page",
  PER_PAGE: "per_page",
} as const;

export const THEMES = ["dark", "light"] as const;
export const THEME_OPTIONS = ["dark", "light", "system"] as const;
export type Theme = (typeof THEMES)[number];
export type ThemeOption = (typeof THEME_OPTIONS)[number];

export const MEDIA_QUERIES = {
  MAX_SM: "(max-width: 600px)",
  MAX_MD: "(max-width: 900px)",
  MAX_LG: "(max-width: 1200px)",
  MAX_XL: "(min-width: 1600px)",
} as const;
