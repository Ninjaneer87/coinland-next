"use client";

import React from "react";
import useCoin from "@/hooks/query/useCoin";

function CoinDetails() {
  const { data: coin } = useCoin();

  return <div>Rank: {coin?.coingecko_rank}</div>;
}

export default CoinDetails;
