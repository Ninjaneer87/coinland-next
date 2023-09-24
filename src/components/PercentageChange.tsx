import { useFormatter } from "next-intl";
import React from "react";

type Props = {
  percentageChange: number;
};

const PercentageChange = ({ percentageChange }: Props) => {
  const { number } = useFormatter();
  const isPositive = percentageChange > 0;
  const formattedPercentageChange = number(Math.abs(percentageChange) / 100, {
    style: "percent",
    maximumFractionDigits: 2,
  });
  const caret = isPositive ? <span>&#x25B4;</span> : <span>&#x25BE;</span>;

  return (
    <span
      className={`${
        isPositive
          ? "text-green-500 bg-green-200/20"
          : "text-red-500 bg-red-200/20"
      } rounded-md p-1 whitespace-nowrap`}
    >
      {caret} {formattedPercentageChange}
    </span>
  );
};

export default PercentageChange;
