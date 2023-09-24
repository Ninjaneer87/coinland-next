import { getCoin } from "@/lib/fetchers";
import { createDehydratedState } from "@/utils/common";
import { QUERY_CLIENT_KEYS } from "@/utils/constants";
import { Hydrate } from "@tanstack/react-query";
import CoinInfo from "./_components/CoinInfo";
import CoinDetails from "./_components/CoinDetails";

const { COIN } = QUERY_CLIENT_KEYS;

type Params = { params: { id: string } };

export default async function Coin({ params: { id } }: Params) {
  const dehydratedState = await createDehydratedState([COIN, id], () =>
    getCoin(id)
  );

  return (
    <Hydrate state={dehydratedState}>
      <div className="grid grid-cols-[1fr] md:grid-cols-[1fr,_2fr] lg:grid-cols-[1fr,_3fr] gap-3">
        <div className="p-4">
          <CoinInfo />
        </div>

        <div className="p-4">
          <CoinDetails />
        </div>
      </div>
    </Hydrate>
  );
}
