"use client";

import React, { memo } from "react";
import Link from "next/link";
import { ROUTES } from "@/utils/constants";
import Image from "next/image";
import { USD_FORMAT_OPTIONS, checkImageUrl } from "@/utils/common";
import PercentageChange from "@/components/PercentageChange";
import { useFormatter } from "next-intl";
import SparklineCell from "./SparklineCell";
import { Tooltip } from "@nextui-org/react";
import { useMediaQueryContext } from "@/context/mediaQueryContext";
import CirculatingSupplyCell from "./CirculatingSupplyCell";

type Props = {
  coinItem: Partial<CoinItem>;
  columnKey: React.Key;
};

function CoinItemCell({ coinItem, columnKey }: Props) {
  const { number } = useFormatter();
  const { maxMD } = useMediaQueryContext();

  switch (columnKey) {
    case "market_cap_rank":
      return coinItem[columnKey];

    case "name":
      return (
        <Link
          href={ROUTES.COIN(coinItem.id!)}
          className="flex gap-3 items-center hover:text-primary transition-colors"
        >
          <Image
            src={checkImageUrl(coinItem.image!)}
            alt={coinItem.name!}
            className="w-12 h-12 object-contain p-1 rounded-full shadow-[inset_0_0_24px_rgba(255,255,255,0.2)]"
            width={48}
            height={48}
          />
          <div>
            <div>{coinItem.name}</div>
            <div className="text-foreground/50">
              {coinItem.symbol!.toUpperCase()}
            </div>
          </div>
        </Link>
      );

    case "current_price":
      const formattedPrice = number(coinItem[columnKey]!, USD_FORMAT_OPTIONS);
      const priceEl = <span className="block truncate">{formattedPrice}</span>;
      return (
        <Tooltip
          hidden={formattedPrice.length < 12}
          color="default"
          classNames={{
            base: "border border-foreground/5 border-solid",
            arrow: "border border-foreground/5 border-solid",
          }}
          content={<div className="p-2">{formattedPrice}</div>}
          showArrow
          placement="bottom"
          delay={300}
        >
          {priceEl}
        </Tooltip>
      );

    case "price_change_percentage_24h":
      return <PercentageChange percentageChange={coinItem[columnKey]!} />;

    case "market_cap":
      return number(coinItem[columnKey]!, USD_FORMAT_OPTIONS);

    case "total_volume":
      return (
        <div>
          <div>{number(coinItem[columnKey]!, USD_FORMAT_OPTIONS)}</div>
          <div className="text-foreground/50 text-xs mt-1">
            {number(coinItem[columnKey]! / coinItem.current_price!, {
              notation: "standard",
              maximumFractionDigits: 0,
            })}{" "}
            {coinItem.symbol!.toUpperCase()}
          </div>
        </div>
      );

    case "circulating_supply":
      return <CirculatingSupplyCell coinItem={coinItem} number={number} />;

    case "sparkline_in_7d":
      return (
        <SparklineCell data={coinItem[columnKey]!.price} key={`${maxMD}`} />
      );

    default:
      return null;
  }
}

export default memo(CoinItemCell);
