import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Hydrate } from "@tanstack/react-query";
import { getGlobals } from "@/lib/fetchers";
import ClientProviders from "@/components/ClientProviders";
import { QUERY_CLIENT_KEYS } from "@/utils/constants";
import { createDehydratedState } from "@/utils/common";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coinland v2",
  description: "Coin Gecko clone",
};

const { GLOBALS } = QUERY_CLIENT_KEYS;

type Props = { children: React.ReactNode };
export default async function RootLayout({ children }: Props) {
  const dehydratedState = await createDehydratedState([GLOBALS], getGlobals);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          <Hydrate state={dehydratedState}>
            <Header />
            <main className="my-4">{children}</main>
            <Footer />
          </Hydrate>
        </ClientProviders>
      </body>
    </html>
  );
}
