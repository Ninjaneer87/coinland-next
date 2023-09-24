import getQueryClient from "@/lib/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import { SearchParams } from "./constants";
import { ReadonlyURLSearchParams } from "next/navigation";
import { NumberFormatOptions } from "next-intl";

const isClient = typeof window !== "undefined";

export function composeUrl(path: string, queryParams?: Record<string, string>) {
  const url = new URL(path);

  if (queryParams)
    for (const [key, value] of Object.entries(queryParams)) {
      url.searchParams.append(key, value);
    }

  return url;
}

export function extractPaginationSearchParams({ searchParams }: SearchParams) {
  const { page, per_page } = searchParams ?? {};
  const pageParam = page && !isNaN(+page) ? +page : 1;
  const perPageParam = per_page && !isNaN(+per_page) ? +per_page : 100;

  return {
    pageParam,
    perPageParam,
  };
}

export function extractSearchParams(searchParams: ReadonlyURLSearchParams) {
  const searchParamsObject = {} as Record<string, string | undefined>;
  for (const key in searchParams.keys()) {
    const value = searchParams.get(key);
    if (value) searchParamsObject[key] = value;
  }
  return searchParamsObject;
}

export async function createDehydratedState<T>(
  queryKey: any[],
  fetcher: () => Promise<T>
) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(queryKey, fetcher);
  const dehydratedState = dehydrate(queryClient);

  return dehydratedState;
}

export function checkImageUrl(url: string) {
  if (url.startsWith("http")) return url;
  if (url.startsWith("/")) return url;

  return `/${url}`;
}

export function getSystemTheme() {
  const isDark = window.matchMedia?.("(prefers-color-scheme:dark)").matches;
  return isDark ? "dark" : "light";
}

export function geThemeFromHTMLElement(element: HTMLElement) {
  const isDark = element.classList.contains("dark");
  const isLight = element.classList.contains("light");

  if (isDark) return "dark";
  if (isLight) return "light";

  return null;
}

export function disableScroll(disable: boolean) {
  if (!isClient) return;

  const body = document.querySelector("body")!;
  body.style.overflow = disable ? "hidden" : "auto";
}

export const USD_FORMAT_OPTIONS: NumberFormatOptions = {
  currency: "usd",
  currencyDisplay: "symbol",
  currencySign: "accounting",
  style: "currency",
  trailingZeroDisplay: "stripIfInteger",
  minimumSignificantDigits: 3,
  maximumFractionDigits: 2,
};

export const DOMINANCE_FORMAT_OPTIONS: NumberFormatOptions = {
  style: "percent",
  maximumFractionDigits: 1,
};
