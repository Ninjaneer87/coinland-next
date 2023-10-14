import "@/app/globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Hydrate } from "@tanstack/react-query";
import { getGlobals } from "@/lib/fetchers";
import ClientProviders from "@/components/ClientProviders";
import {
  LOCAL_STORAGE_KEYS,
  QUERY_CLIENT_KEYS,
  Theme,
  ThemeOption,
} from "@/utils/constants";
import { createDehydratedState } from "@/utils/common";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coinland v2",
  description: "Coin Gecko clone",
};

const { GLOBALS } = QUERY_CLIENT_KEYS;
const { THEME, THEME_OPTION } = LOCAL_STORAGE_KEYS;

type Props = { children: React.ReactNode };

export default async function RootLayout({ children }: Props) {
  const cookieStore = cookies();
  const serverTheme: Theme =
    (cookieStore.get(THEME)?.value as Theme | undefined) || "light";
  const serverThemeOption: ThemeOption =
    (cookieStore.get(THEME_OPTION)?.value as ThemeOption | undefined) ||
    "light";
  const dehydratedState = await createDehydratedState([GLOBALS], getGlobals);

  return (
    <html lang="en" className={serverTheme}>
      <body
        className={`${inter.className}`}
      >
        <ClientProviders
          serverTheme={serverTheme}
          serverThemeOption={serverThemeOption}
        >
          <Hydrate state={dehydratedState}>
            <Header />
            <main className="py-4">{children}</main>
            <Footer />
          </Hydrate>
        </ClientProviders>
      </body>
    </html>
  );
}
