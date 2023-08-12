import { getCoins } from "@/lib/fetchers";
import { Hydrate } from "@tanstack/react-query";
import { QUERY_CLIENT_KEYS, QueryParams } from "@/utils/constants";
import { createDehydratedState } from "@/utils/common";
import CoinsTable from "./_components/CoinsTable";

const { COINS } = QUERY_CLIENT_KEYS;

type SearchParams = {
  searchParams?: Record<QueryParams, string | string[] | undefined>;
};

export default async function Home({ searchParams }: SearchParams) {
  const { page, per_page } = searchParams ?? {};
  const pageParam = page && !isNaN(+page) ? +page : 1;
  const perPageParam = per_page && !isNaN(+per_page) ? +per_page : 100;
  const dehydratedState = await createDehydratedState(
    [COINS, pageParam, perPageParam],
    () => getCoins(pageParam, perPageParam)
  );

  return (
    <Hydrate state={dehydratedState}>
      <div className="flex flex-col gap-3 justify-center items-center">
        <h1 className="text-6xl">
          Coinland <span className="text-yellow-500">v2</span>
        </h1>

        <CoinsTable />
      </div>
    </Hydrate>
  );
}
