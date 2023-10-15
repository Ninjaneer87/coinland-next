/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import CoinItemCell from "./CoinItemCell";
import useCoins from "@/hooks/query/useCoins";
import { useCoinsPagination } from "@/hooks/useCoinsPagination";
import NoSSR from "@/components/NoSSR";
import SkeletonTable from "@/components/SkeletonTable";
import { Pagination, Tooltip } from "@nextui-org/react";
import PaginationItem from "@/components/PaginationItem";
import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useMediaQueryContext } from "@/context/mediaQueryContext";
import { IoInformationCircle } from "react-icons/io5";

const columnItems = [
  {
    header: "#",
    accessorKey: "market_cap_rank",
    size: 40,
    maxSize: 40,
    minSize: 40,
  },
  {
    header: "Coin",
    accessorKey: "name",
    size: 200,
    maxSize: 200,
    minSize: 200,
  },
  {
    header: "Price",
    accessorKey: "current_price",
    size: 120,
    maxSize: 120,
    minSize: 120,
  },
  {
    header: "24h %",
    accessorKey: "price_change_percentage_24h",
    size: 80,
    maxSize: 80,
    minSize: 80,
  },
  {
    header: "Market Cap",
    accessorKey: "market_cap",
    size: 150,
    maxSize: 150,
    minSize: 150,
    tooltipContent: (
      <>
        The total market value of a cryptocurrency's circulating supply. It is
        analogous to the free-float capitalization in the stock market.
        <br />
        <br />
        Market Cap = Current Price x Circulating Supply.
      </>
    ),
  },
  {
    header: "24h Volume",
    accessorKey: "total_volume",
    size: 220,
    maxSize: 220,
    minSize: 220,
    tooltipContent: (
      <>
        A measure of how much of a cryptocurrency was traded in the last 24
        hours.
      </>
    ),
  },
  {
    header: "Circulating Supply",
    accessorKey: "circulating_supply",
    size: 260,
    maxSize: 260,
    minSize: 260,
    tooltipContent: (
      <>
        The amount of coins that are circulating in the market and are in public
        hands. It is analogous to the flowing shares in the stock market.
      </>
    ),
  },
  {
    header: "Last 7 Days",
    accessorKey: "sparkline_in_7d",
    size: 200,
    maxSize: 200,
    minSize: 200,
  },
];

const columns: ColumnDef<Partial<CoinItem>>[] = columnItems.map(
  ({ accessorKey, header, size, maxSize, minSize, tooltipContent }) => ({
    header: () => (
      <div
        className={`p-2 flex gap-2 items-center ${
          accessorKey === "name" ? "justify-start" : "justify-end"
        }`}
      >
        {header}{" "}
        {tooltipContent && (
          <Tooltip
            color="default"
            // delay={500}
            placement="bottom"
            showArrow
            classNames={{
              base: 'border border-foreground/5 border-solid',
              arrow: 'border border-foreground/5 border-solid'
            }}
            content={
              <div className="max-w-[300px] px-2 py-4">
                {tooltipContent}
              </div>
            }
          >
            <div>
              <IoInformationCircle />
            </div>
          </Tooltip>
        )}
      </div>
    ),
    accessorKey,
    id: accessorKey,
    cell: ({ row }) => {
      return <CoinItemCell coinItem={row.original} columnKey={accessorKey} />;
    },
    size,
    maxSize,
    minSize,
  })
);

function CoinsTable() {
  const { data: coins, isLoading } = useCoins();
  const { totalPages, pageParam } = useCoinsPagination();
  const [sorting, setSorting] = useState<SortingState>([]);
  const { ref: theadRef, inView: theadInView } = useInView({
    threshold: 0,
    initialInView: true,
  });
  const fixedHeaderRef = useRef<HTMLTableSectionElement>(null);
  const [tableScrollLeft, setTableScrollLeft] = useState(0);
  const isTableScrolledRight = tableScrollLeft > 0;
  const { maxMD } = useMediaQueryContext();

  function handleHorizontalScroll(e: React.UIEvent<HTMLDivElement>) {
    const { scrollLeft } = e.currentTarget;
    setTableScrollLeft(scrollLeft);
  }

  const table = useReactTable({
    data: coins ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  if (coins?.status?.error_code === 429) {
    return <h1>Too many requests :(</h1>;
  }

  if (isLoading) {
    return <SkeletonTable numberOfRows={20} />;
  }

  const tableHeadContent = table.getHeaderGroups().map((headerGroup) => (
    <tr key={headerGroup.id}>
      {headerGroup.headers.map((header, thIndex) => {
        const isStickyIndex = [0, 1].includes(thIndex);
        const { size, minSize, maxSize } = columnItems[thIndex];
        const leftPosition = [...Array(thIndex).keys()].reduce((acc, curr) => {
          const { size } = columnItems[curr];
          return acc + size;
        }, 0);
        const isLastStickyIndex = thIndex === 1;

        return (
          <th
            key={header.id}
            colSpan={header.colSpan}
            style={{
              width: isLastStickyIndex && maxMD ? size - 50 : size,
              minWidth: isLastStickyIndex && maxMD ? minSize - 50 : minSize,
              maxWidth: isLastStickyIndex && maxMD ? maxSize - 50 : maxSize,
              ...(isStickyIndex && { left: leftPosition }),
              ...(!isStickyIndex &&
                !theadInView && {
                  transform: `translateX(${-tableScrollLeft}px)`,
                }),
            }}
            className={`z-30 bg-background ${isStickyIndex ? " sticky" : ""} ${
              isStickyIndex && isTableScrolledRight && isLastStickyIndex
                ? "relative after:content-[''] after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[1px] after:bg-primary"
                : ""
            }`}
          >
            {header.isPlaceholder ? null : (
              <div
                className={`py-2 
                ${
                  header.column.getCanSort() ? "cursor-pointer select-none" : ""
                }`}
                onClick={header.column.getToggleSortingHandler()}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </div>
            )}
          </th>
        );
      })}
    </tr>
  ));

  return (
    <>
      <NoSSR fallback={<SkeletonTable numberOfRows={20} />}>
        <div className="overflow-x-auto" onScroll={handleHorizontalScroll}>
          <div className="w-full h-4" />
          <table className="mx-auto border-0">
            <thead
              ref={theadRef}
              className={`${
                !theadInView
                  ? "opacity-0 pointer-events-none"
                  : "opacity-1 pointer-events-auto"
              } bg-background text-primary transition-opacity duration-300 border-b-1 border-primary`}
            >
              {tableHeadContent}
            </thead>

            <thead
              ref={fixedHeaderRef}
              className={`${
                theadInView
                  ? "opacity-0 pointer-events-none"
                  : "opacity-1 pointer-events-auto"
              } fixed top-0 bg-background text-primary transition-opacity duration-300 z-20 overflow-x-scroll hide-scrollbar border-b-1 border-primary`}
            >
              {tableHeadContent}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, rowIndex) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell, cellIndex) => {
                      const isStickyIndex = [0, 1].includes(cellIndex);
                      const { size, minSize, maxSize } = columnItems[cellIndex];
                      const leftPosition = [...Array(cellIndex).keys()].reduce(
                        (acc, curr) => {
                          const { size } = columnItems[curr];
                          return acc + size;
                        },
                        0
                      );
                      const isLastStickyIndex = cellIndex === 1;

                      return (
                        <td
                          key={cell.id}
                          style={{
                            width:
                              isLastStickyIndex && maxMD ? size - 50 : size,
                            minWidth:
                              isLastStickyIndex && maxMD
                                ? minSize - 50
                                : minSize,
                            maxWidth:
                              isLastStickyIndex && maxMD
                                ? maxSize - 50
                                : maxSize,
                            ...(isStickyIndex && { left: leftPosition }),
                          }}
                          className={`bg-background ${
                            isStickyIndex ? "sticky z-10" : ""
                          } ${
                            isStickyIndex &&
                            isTableScrolledRight &&
                            isLastStickyIndex
                              ? "relative after:content-[''] after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[1px] after:bg-primary"
                              : ""
                          }
                          `}
                        >
                          <div
                            className={`p-2 ${
                              cell.column.columnDef.id === "name"
                                ? "text-start"
                                : "text-end"
                            }${rowIndex === 0 ? " pt-4" : ""}
                            `}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Pagination
          showControls
          disableAnimation
          color="default"
          total={totalPages}
          page={pageParam || 1}
          className="gap-2 sticky bottom-0 z-20 bg-background w-fit mx-auto mt-4 border-t-1 border-primary"
          renderItem={PaginationItem}
          size={maxMD ? "sm" : "md"}
        />
      </NoSSR>
    </>
  );
}

export default CoinsTable;
