import { Progress, Tooltip } from "@nextui-org/react";
import { NumberFormatOptions } from "next-intl";
import React from "react";

type Props = {
  coinItem: Partial<CoinItem>;
  number: (
    value: number | bigint,
    formatOrOptions?: string | NumberFormatOptions | undefined
  ) => string;
};

function CirculatingSupplyCell({ coinItem, number }: Props) {
  return (
    <Tooltip
      color="default"
      showArrow
      placement="bottom"
      delay={300}
      hidden={!(coinItem.circulating_supply && coinItem.max_supply)}
      classNames={{
        base: "border border-foreground/5 border-solid",
        arrow: "border border-foreground/5 border-solid",
      }}
      content={
        <div className="px-2 py-4 min-w-[300px] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>Percentage</div>
            <div className="text-foreground/50">
              {number(coinItem.circulating_supply! / coinItem.max_supply!, {
                style: "percent",
                maximumFractionDigits: 2,
              })}
            </div>
          </div>

          <Progress
            aria-label="Loading..."
            size="sm"
            value={(coinItem.circulating_supply! / coinItem.max_supply!) * 100}
            classNames={{
              indicator: "bg-gradient-to-r from-transparent to-primary bg-transparent",
            }}
          />

          <div className="flex items-center justify-between">
            <div>Circulating supply</div>
            <div className="flex items-center gap-1 text-foreground/50">
              {number(coinItem.circulating_supply!, {
                notation: "standard",
                maximumFractionDigits: 0,
              })}
              <span className="">{coinItem.symbol!.toUpperCase()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>Max supply</div>
            <div className="flex items-center gap-1 text-foreground/50">
              {number(coinItem.max_supply!, {
                notation: "standard",
                maximumFractionDigits: 0,
              })}
              <span className="">{coinItem.symbol!.toUpperCase()}</span>
            </div>
          </div>
        </div>
      }
    >
      <div className="flex flex-col items-end">
        <div>
          {number(coinItem.circulating_supply!, {
            notation: "standard",
            maximumFractionDigits: 0,
          })}{" "}
          <span className="text-foreground/50">
            {coinItem.symbol!.toUpperCase()}
          </span>
        </div>
        {coinItem.circulating_supply && coinItem.max_supply && (
          <Progress
            className="mt-2 max-w-[180px]"
            aria-label="Loading..."
            size="sm"
            value={(coinItem.circulating_supply / coinItem.max_supply) * 100}
            classNames={{
              indicator: "bg-gradient-to-r from-transparent to-primary bg-transparent",
            }}
          />
        )}
      </div>
    </Tooltip>
  );
}

export default CirculatingSupplyCell;
