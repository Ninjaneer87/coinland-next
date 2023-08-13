"use client";

import useCoin from "@/hooks/query/useCoin";
import React from "react";

function CoinInfo() {
  const { data: coin } = useCoin();

  return <div>Coin {coin?.name} measured in Dollars</div>;
}

export default CoinInfo;
