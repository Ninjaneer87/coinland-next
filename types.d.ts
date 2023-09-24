type Coin = {
  id: string;
  symbol: string;
  name: string;
  asset_platform_id: string | null;
  platforms: Record<string, string>;
  detail_platforms: Record<
    string,
    {
      decimal_place: number | null;
      contract_address: string;
    }
  >;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: string[];
  public_notice: string | null;
  additional_notices: string[];
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier: number | null;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  country_origin: string;
  genesis_date: Date;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_count: number;
  market_cap_rank: number;
  coingecko_rank: number;
  coingecko_score: number;
  developer_score: number;
  community_score: number;
  liquidity_score: number;
  public_interest_score: number;
  market_data: {
    current_price: Record<Currency, number>;
    total_value_locked: Record<Currency, number> | null;
    mcap_to_tvl_ratio: number | null;
    fdv_to_tvl_ratio: number | null;
    roi: number | null;
    ath: Record<Currency, number>;
    ath_change_percentage: Record<Currency, number>;
    ath_date: Record<Currency, Date>;
    atl: Record<Currency, number>;
    atl_change_percentage: Record<Currency, number>;
    atl_date: Record<Currency, Date>;
    market_cap: Record<Currency, number>;
    market_cap_rank: number;
    fully_diluted_valuation: Record<Currency, number> | null;
    total_volume: Record<Currency, number>;
    high_24h: Record<Currency, number>;
    low_24h: Record<Currency, number>;
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    price_change_24h_in_currency: Record<Currency, number>;
    price_change_percentage_1h_in_currency: Record<Currency, number>;
    price_change_percentage_24h_in_currency: Record<Currency, number>;
    price_change_percentage_7d_in_currency: Record<Currency, number>;
    price_change_percentage_14d_in_currency: Record<Currency, number>;
    price_change_percentage_30d_in_currency: Record<Currency, number>;
    price_change_percentage_60d_in_currency: Record<Currency, number>;
    price_change_percentage_200d_in_currency: Record<Currency, number>;
    price_change_percentage_1y_in_currency: Record<Currency, number>;
    market_cap_change_24h_in_currency: Record<Currency, number>;
    market_cap_change_percentage_24h_in_currency: Record<Currency, number>;
    total_supply: number | null;
    max_supply: number | null;
    circulating_supply: number | null;
    last_updated: Date;
  };
  community_data: {
    facebook_likes: number | null;
    twitter_followers: number | null;
    reddit_average_posts_48h: number | null;
    reddit_average_comments_48h: number | null;
    reddit_subscribers: number | null;
    reddit_accounts_active_48h: number | null;
    telegram_channel_user_count: number | null;
  };
  developer_data: {
    forks: number | null;
    stars: number | null;
    subscribers: number | null;
    total_issues: number | null;
    closed_issues: number | null;
    pull_requests_merged: number | null;
    pull_request_contributors: number | null;
    code_additions_deletions_4_weeks: {
      additions: number | null;
      deletions: number | null;
    };
    commit_count_4_weeks: number | null;
    last_4_weeks_commit_activity_series: number[] | null;
  };
  public_interest_stats: {
    alexa_rank: number | null;
    bing_matches: number | null;
  };
  status_updates: {
    description: string;
    category: string;
    created_at: Date;
    user: string;
    user_title: string;
    pin: boolean;
    project: {
      type: string;
      id: string;
      name: string;
      symbol: string;
      image: {
        thumb: string;
        small: string;
        large: string;
      };
    };
  }[];
  last_updated: Date;
};

type CoinItem = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: Date;
  atl: number;
  atl_change_percentage: number;
  atl_date: Date;
  roi: {
    times: number;
    currency: Currency;
    percentage: number;
  } | null;
  last_updated: Date;
  sparkline_in_7d: {
    price: number[];
  };
};

type Globals = {
  data: {
    active_cryptocurrencies: number;
    upcoming_icos: number;
    ongoing_icos: number;
    ended_icos: number;
    markets: number;
    total_market_cap: Record<Currency, number>;
    total_volume: Record<Currency, number>;
    market_cap_percentage: Record<Currency, number>;
    market_cap_change_percentage_24h_usd: number;
    updated_at: Date;
  };
};

type ErrorStatus = {
  status: {
    error_code: number;
    error_message: string;
  };
};

type Currency =
  | "aed"
  | "ars"
  | "aud"
  | "bch"
  | "bdt"
  | "bhd"
  | "bmd"
  | "bnb"
  | "brl"
  | "btc"
  | "cad"
  | "chf"
  | "clp"
  | "cny"
  | "czk"
  | "dkk"
  | "dot"
  | "eos"
  | "eth"
  | "eur"
  | "gbp"
  | "hkd"
  | "huf"
  | "idr"
  | "ils"
  | "inr"
  | "jpy"
  | "krw"
  | "kwd"
  | "lkr"
  | "ltc"
  | "mmk"
  | "mxn"
  | "myr"
  | "ngn"
  | "nok"
  | "nzd"
  | "php"
  | "pkr"
  | "pln"
  | "rub"
  | "sar"
  | "sek"
  | "sgd"
  | "thb"
  | "try"
  | "twd"
  | "uah"
  | "usd"
  | "vef"
  | "vnd"
  | "xag"
  | "xau"
  | "xdr"
  | "xlm"
  | "xrp"
  | "yfi"
  | "zar"
  | "bits"
  | "link"
  | "sats";

type AllCoinsItem = {
  id: string;
  symbol: string;
  name: string;
};
