export const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://ninjaneer87.github.io/coinland/*"]
    : ["https://www.google.com/"];

export const API_URLS = {
  v1: {
    coinsUrl:
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    metadataUrl: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info",
    globalsUrl:
      "https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest",
  },
};

export const responseHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": `*`,
};
