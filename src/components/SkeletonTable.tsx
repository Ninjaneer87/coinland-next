"use client";

import React, { useMemo } from "react";
import { Skeleton } from "@nextui-org/react";

type Props = {
  numberOfRows: number;
};

function SkeletonTable({ numberOfRows }: Props) {
  const rows = useMemo(
    () =>
      [...Array(numberOfRows).keys()].map((i) => ({
        id: `${i}`,
      })),
    [numberOfRows]
  );

  return (
    <>
      {rows.map((row) => (
        <Skeleton key={row.id} className="h-16 w-full rounded-lg my-2" />
      ))}
    </>
  );
}

export default SkeletonTable;
