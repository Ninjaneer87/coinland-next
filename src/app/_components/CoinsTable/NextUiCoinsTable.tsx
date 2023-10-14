"use client";

import React from "react";
import useCoins from "@/hooks/query/useCoins";
import {
  Pagination,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import PaginationItem from "@/components/PaginationItem";
import { useCoinsPagination } from "@/hooks/useCoinsPagination";
import CoinItemCell from "./CoinItemCell";
import NoSSR from "@/components/NoSSR";
import SkeletonTable from "@/components/SkeletonTable";

const columns = [
  { name: "#", uid: "market_cap_rank" },
  { name: "Coin", uid: "name" },
  { name: "Price", uid: "current_price" },
  { name: "24h %", uid: "price_change_percentage_24h" },
  { name: "Market Cap", uid: "market_cap" },
  { name: "24h Volume", uid: "total_volume" },
  { name: "Circulating Supply", uid: "circulating_supply" },
  { name: "Last 7 Days", uid: "sparkline_in_7d" },
];

function NextUiCoinsTable() {
  const { data: coins } = useCoins();
  const { totalPages, pageParam, perPageParam } = useCoinsPagination();

  if (coins?.status?.error_code === 429) {
    return <h1>Too many requests :(</h1>;
  }

  return (
    <>
      <NoSSR fallback={<SkeletonTable numberOfRows={20} />}>
        <Table
          aria-label="Example table with custom cells"
          shadow="none"
          removeWrapper
          isHeaderSticky
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                id={column.uid}
                className={`bg-primary text-background min-w-[100px] ${
                  column.uid === "name" ? "text-start" : "text-end"
                }`}
                key={column.uid}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={coins}>
            {(coinItem) => (
              <TableRow key={coinItem.id} id={coinItem.id + coinItem.name}>
                {(columnKey) => (
                  <TableCell
                    id={coinItem.id}
                    className={columnKey === "name" ? "text-start" : "text-end"}
                  >
                    <CoinItemCell coinItem={coinItem} columnKey={columnKey} />
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </NoSSR>

      <Pagination
        showControls
        total={totalPages}
        page={pageParam || 1}
        className="gap-2 sticky bottom-0 z-50 bg-content3 rounded-xl"
        renderItem={PaginationItem}
      />
    </>
  );
}

export default NextUiCoinsTable;
