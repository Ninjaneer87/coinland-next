type Coin = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  infinite_supply: boolean;
  last_updated: Date;
  date_added: Date;
  tags: string[];
  platform: number | null;
  self_reported_circulating_supply: number | null;
  self_reported_market_cap: number | null;
  quote: {
    USD: Currency;
    BTC: Currency;
  };
};

type Currency = {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  last_updated: Date;
};

type CoinsResponse = {
  data: Coin[];
  status: Status;
};

type Status = {
  timestamp: Date;
  error_code: number;
  error_message: string;
  elapsed: number;
  credit_count: number;
};

type MetadataResponse = {
  data: Metadata;
  status: Status;
};

type Metadata = {
  urls: {
    website: string[];
    technical_doc: string[];
    twitter: string[];
    reddit: string[];
    message_board: string[];
    announcement: string[];
    chat: string[];
    explorer: string[];
    source_code: string[];
  };
  logo: string;
  id: number;
  name: string;
  symbol: string;
  slug: string;
  description: string;
  date_added: Date;
  date_launched: Date;
  tags: string[];
  platform: number | null;
  category: string;
};

type GlobalsResponse = {
  data: Globals;
  status: Status & { notice: string };
};

type Globals = {
  btc_dominance: number;
  eth_dominance: number;
  active_cryptocurrencies: number;
  total_cryptocurrencies: number;
  active_market_pairs: number;
  active_exchanges: number;
  total_exchanges: number;
  last_updated: Date;
  quote: {
    active_cryptocurrencies: number;
    total_cryptocurrencies: number;
    active_market_pairs: number;
    active_exchanges: number;
    total_exchanges: number;
    eth_dominance: number;
    btc_dominance: number;
    eth_dominance_yesterday: number;
    btc_dominance_yesterday: number;
    eth_dominance_24h_percentage_change: number;
    btc_dominance_24h_percentage_change: number;
    defi_volume_24h: number;
    defi_volume_24h_reported: number;
    defi_market_cap: number;
    defi_24h_percentage_change: number;
    stablecoin_volume_24h: number;
    stablecoin_volume_24h_reported: number;
    stablecoin_market_cap: number;
    stablecoin_24h_percentage_change: number;
    derivatives_volume_24h: number;
    derivatives_volume_24h_reported: number;
    derivatives_24h_percentage_change: number;
    quote: {
      USD: {
        total_market_cap: number;
        total_volume_24h: number;
        total_volume_24h_reported: number;
        altcoin_volume_24h: number;
        altcoin_volume_24h_reported: number;
        altcoin_market_cap: number;
        defi_volume_24h: number;
        defi_volume_24h_reported: number;
        defi_24h_percentage_change: number;
        defi_market_cap: number;
        stablecoin_volume_24h: number;
        stablecoin_volume_24h_reported: number;
        stablecoin_24h_percentage_change: number;
        stablecoin_market_cap: number;
        derivatives_volume_24h: number;
        derivatives_volume_24h_reported: number;
        derivatives_24h_percentage_change: number;
        last_updated: Date;
        total_market_cap_yesterday: number;
        total_volume_24h_yesterday: number;
        total_market_cap_yesterday_percentage_change: number;
        total_volume_24h_yesterday_percentage_change: number;
      };
    };
    last_updated: Date;
  };
};
