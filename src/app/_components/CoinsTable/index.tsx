"use client";

import React from "react";
import Image from "next/image";
import useCoins from "@/hooks/query/useCoins";
import Link from "next/link";
import { ROUTES } from "@/utils/constants";

function CoinsTable() {
  const { data: coins, isLoading, error } = useCoins();

  if (coins?.status?.error_code === 429) {
    return <h1>Too many requests :(</h1>;
  }

  return (
    <>
      {coins?.map((coin) => (
        <Link href={ROUTES.COIN(coin.id)} key={coin.id} className="flex gap-3 items-center">
          <Image
            src={coin.image}
            alt={coin.name}
            className="w-12 h-12 object-contain border border-gray-800 p-1 rounded-full"
            width={48}
            height={48}
          />
          <span>{coin.name}</span>
        </Link>
      ))}
    </>
  );
}

export default CoinsTable;
