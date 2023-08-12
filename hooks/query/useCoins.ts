import { getCoins } from "@/lib/fetchers";
import { QUERY_CLIENT_KEYS, QUERY_PARAMS } from "@/utils/constants";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const pageParam = searchParams.get(PAGE);
  const perPageParam = searchParams.get(PER_PAGE);
  const pageParamNumber = pageParam && !isNaN(+pageParam) ? +pageParam : 1;
  const perPageParamNumber =
    perPageParam && !isNaN(+perPageParam) ? +perPageParam : 100;

  const page = params?.page ?? pageParamNumber;
  const perPage = params?.perPage ?? perPageParamNumber;

  return useQuery(["coins", page, perPage], () => getCoins(page, perPage), {
    ...options,
  });
}

export default useCoins;
