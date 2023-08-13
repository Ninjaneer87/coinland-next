import { getGlobals } from "@/lib/fetchers";
import { QUERY_CLIENT_KEYS } from "@/utils/constants";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

const { GLOBALS } = QUERY_CLIENT_KEYS;

function useGlobals(
  options?: Omit<
    UseQueryOptions<
      Globals & ErrorStatus,
      unknown,
      Globals & ErrorStatus,
      [typeof GLOBALS]
    >,
    "queryKey" | "queryFn"
  >
) {
  return useQuery([QUERY_CLIENT_KEYS.GLOBALS], getGlobals, { ...options });
}

export default useGlobals;
