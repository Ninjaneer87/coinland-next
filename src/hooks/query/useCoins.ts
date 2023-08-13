import { useEffect } from "react";
import { getCoins } from "@/lib/fetchers";
import { QUERY_CLIENT_KEYS, QUERY_PARAMS } from "@/utils/constants";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useStorage } from "../useStorage";

const { PAGE, PER_PAGE } = QUERY_PARAMS;
const { COINS } = QUERY_CLIENT_KEYS;

type CoinsUseQueryOptions = Omit<
  UseQueryOptions<
    CoinItem[] & ErrorStatus,
    unknown,
    CoinItem[] & ErrorStatus,
    [typeof COINS, number, number]
  >,
  "queryKey" | "queryFn"
>;
type CoinsParams = { page?: number; perPage?: number };

function useCoins(options?: CoinsUseQueryOptions, params?: CoinsParams) {
  const [, setPageStorage] = useStorage(PAGE, 1);
  const [, setPerPageStorage] = useStorage(PER_PAGE, 100);
  const searchParams = useSearchParams();
  const pageParam = searchParams.get(PAGE);
  const perPageParam = searchParams.get(PER_PAGE);
  const pageParamNumber = pageParam && !isNaN(+pageParam) ? +pageParam : 1;
  const perPageParamNumber =
    perPageParam && !isNaN(+perPageParam) ? +perPageParam : 100;

  const page = params?.page ?? pageParamNumber;
  const perPage = params?.perPage ?? perPageParamNumber;

  useEffect(() => {
    setPageStorage(page);
    setPerPageStorage(perPage);
  }, [page, perPage, setPageStorage, setPerPageStorage]);

  const { data, ...rest } = useQuery(
    ["coins", page, perPage],
    () => getCoins(page, perPage),
    {
      ...options,
    }
  );

  return { data, ...rest };
}

export default useCoins;
