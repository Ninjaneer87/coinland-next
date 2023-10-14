"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextUIProvider } from "@nextui-org/react";
import ThemeContext from "@/context/themeContext";
import { useDarkMode } from "@/hooks/useDarkMode";
import { NextIntlClientProvider } from "next-intl";
import { useTheme } from "@/hooks/useTheme";
import { Theme, ThemeOption } from "@/utils/constants";
import { MediaQueryContextProvider } from "@/context/mediaQueryContext";

type Props = {
  serverTheme: Theme;
  serverThemeOption: ThemeOption;
  children: React.ReactNode;
};
function ClientProviders({ children, serverTheme, serverThemeOption }: Props) {
  const [client] = useState(new QueryClient());
  // const [dark, toggleDarkMode] = useDarkMode(serverTheme);
  const { theme, themeOption, setTheme } = useTheme(
    serverTheme,
    serverThemeOption
  );

  return (
    <QueryClientProvider client={client}>
      <MediaQueryContextProvider>
        <ThemeContext.Provider value={{ theme, themeOption, setTheme }}>
          <NextUIProvider>
            <NextIntlClientProvider locale="en">
              <>{children}</>
            </NextIntlClientProvider>
          </NextUIProvider>
        </ThemeContext.Provider>
      </MediaQueryContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default ClientProviders;
