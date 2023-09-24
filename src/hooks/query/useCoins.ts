"use client";
import { getCoins } from "@/lib/fetchers";
import { LOCAL_STORAGE_KEYS, QUERY_CLIENT_KEYS } from "@/utils/constants";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useCoinsPagination } from "../useCoinsPagination";

type CoinsUseQueryOptions = Omit<
  UseQueryOptions<
    CoinItem[] & ErrorStatus,
    unknown,
    CoinItem[] & ErrorStatus,
    [typeof QUERY_CLIENT_KEYS.COINS, number, number]
  >,
  "queryKey" | "queryFn"
>;
type CoinsParams = { page?: number; perPage?: number };

function useCoins(options?: CoinsUseQueryOptions, params?: CoinsParams) {
  const { pageParam, perPageParam } = useCoinsPagination();

  const page = params?.page ?? pageParam;
  const perPage = params?.perPage ?? perPageParam;

  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PAGE, JSON.stringify(page));
    localStorage.setItem(LOCAL_STORAGE_KEYS.PER_PAGE, JSON.stringify(perPage));
  }

  return useQuery(["coins", page, perPage], () => getCoins(page, perPage), {
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  });
}

export default useCoins;
