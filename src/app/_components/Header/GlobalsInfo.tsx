import PercentageChange from "@/components/PercentageChange";
import { DOMINANCE_FORMAT_OPTIONS, USD_FORMAT_OPTIONS } from "@/utils/common";
import { NumberFormatOptions, useFormatter } from "next-intl";
import React from "react";

type Props = {
  globals: Globals;
};

function GlobalsInfo({ globals }: Props) {
  const { number } = useFormatter();
  const {
    markets,
    active_cryptocurrencies,
    total_market_cap: { usd: totalMarketCap },
    total_volume: { usd: totalVolume },
    market_cap_percentage: { btc: btcDominance, eth: ethDominance },
    market_cap_change_percentage_24h_usd,
    ended_icos,
    ongoing_icos,
  } = globals.data;

  const formattedActiveCryptos = number(active_cryptocurrencies, {
    notation: "standard",
  });
  const formattedTotalMarketCap = number(totalMarketCap, USD_FORMAT_OPTIONS);
  const formattedTotalVolume = number(totalVolume, USD_FORMAT_OPTIONS);
  const formattedBtcDominance = number(
    btcDominance / 100,
    DOMINANCE_FORMAT_OPTIONS
  );
  const formattedEthDominance = number(
    ethDominance / 100,
    DOMINANCE_FORMAT_OPTIONS
  );

  return (
    <ul className="flex flex-wrap gap-4 text-xs w-full justify-centers">
      <li>
        Coins: <span className="text-primary">{formattedActiveCryptos}</span>
      </li>
      <li>
        Exchanges: <span className="text-primary">{markets}</span>
      </li>
      <li>
        Market Cap:{" "}
        <span className="text-primary">{formattedTotalMarketCap}</span>{" "}
        <PercentageChange
          percentageChange={market_cap_change_percentage_24h_usd}
        />
      </li>
      <li>
        24h Vol: <span className="text-primary">{formattedTotalVolume}</span>
      </li>
      <li>
        Dominance:{" "}
        <span className="text-primary">
          BTC: {formattedBtcDominance} ETH: {formattedEthDominance}
        </span>
      </li>
      <li>
        Ended ICOs: <span className="text-primary">{ended_icos}</span>
      </li>
      <li>
        Ongoing ICOs: <span className="text-primary">{ongoing_icos}</span>
      </li>
    </ul>
  );
}

export default GlobalsInfo;
