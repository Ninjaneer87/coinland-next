import { getCoin } from "@/lib/fetchers";
import { QUERY_CLIENT_KEYS } from "@/utils/constants";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const { COIN } = QUERY_CLIENT_KEYS;

type CoinUseQueryOptions = Omit<
  UseQueryOptions<
    Coin & ErrorStatus,
    unknown,
    Coin & ErrorStatus,
    [typeof COIN, string]
  >,
  "queryKey" | "queryFn"
>;

function useCoin(options?: CoinUseQueryOptions) {
  const params = useParams();
  const id = params.id as string;

  return useQuery(["coin", id], () => getCoin(id), {
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  });
}

export default useCoin;
