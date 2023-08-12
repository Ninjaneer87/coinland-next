"use client";

import React from "react";
import useGlobals from "@/hooks/query/useGlobals";
import Link from "next/link";

function Header() {
  const { data: globals } = useGlobals();

  return (
    <header className="border border-solid p-4 flex justify-between sticky top-0 backdrop-blur-lg">
      <nav>
        <Link href={"/"}>Home</Link>
      </nav>
      <div>Coins : {globals?.data?.active_cryptocurrencies}</div>
    </header>
  );
}

export default Header;
