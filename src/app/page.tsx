import { getCoins } from "@/lib/fetchers";
import { Hydrate } from "@tanstack/react-query";
import { QUERY_CLIENT_KEYS, SearchParams } from "@/utils/constants";
import { createDehydratedState, extractPaginationSearchParams } from "@/utils/common";
import CoinsTable from "./_components/CoinsTable";

const { COINS } = QUERY_CLIENT_KEYS;

export default async function Home({ searchParams }: SearchParams) {
  const { pageParam, perPageParam } = extractPaginationSearchParams({ searchParams });
  const dehydratedState = await createDehydratedState(
    [COINS, pageParam, perPageParam],
    () => getCoins(pageParam, perPageParam)
  );

  return (
    <Hydrate state={dehydratedState}>
      <div className="flex flex-col gap-3 justify-center items-center max-w-screen-2xl m-auto p-4">
        <CoinsTable />
      </div>
    </Hydrate>
  );
}
