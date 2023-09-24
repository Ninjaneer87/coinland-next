import {
  PaginationItemRenderProps,
  PaginationItemType,
} from "@nextui-org/react";
import { ChevronIcon } from "./ChevronIcon";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { composeUrl } from "@/utils/common";
import { baseUrl } from "@/utils/constants";
import { useCoinsPagination } from "@/hooks/useCoinsPagination";

const PaginationItem = ({
  ref,
  value,
  onNext,
  onPrevious,
  className,
}: PaginationItemRenderProps) => {
  const { nextPageUrl, prevPageUrl } = useCoinsPagination();

  if (value === PaginationItemType.NEXT) {
    return (
      <Link
        key={value}
        href={nextPageUrl}
        className={twMerge(className, "bg-transparent min-w-8 w-8 h-8")}
        onClick={onNext}
      >
        <ChevronIcon className="rotate-180" />
      </Link>
    );
  }

  if (value === PaginationItemType.PREV) {
    return (
      <Link
        key={value}
        href={prevPageUrl}
        className={twMerge(className, "bg-transparent min-w-8 w-8 h-8")}
        onClick={onPrevious}
      >
        <ChevronIcon />
      </Link>
    );
  }

  if (value === PaginationItemType.DOTS) {
    return (
      <button key={value} className={twMerge(className, "bg-transparent")}>
        ...
      </button>
    );
  }

  return (
    <Link
      key={value}
      href={composeUrl(baseUrl, { page: `${value}` })}
      ref={ref}
      className={twMerge(className, "bg-transparent")}
    >
      {value}
    </Link>
  );
};

export default PaginationItem;
