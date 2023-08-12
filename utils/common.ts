import getQueryClient from "@/lib/getQueryClient";
import { dehydrate } from "@tanstack/react-query";

export function composeUrl(path: string, queryParams?: Record<string, string>) {
  const url = new URL(path);

  if (queryParams)
    for (const [key, value] of Object.entries(queryParams)) {
      url.searchParams.append(key, value);
    }

  return url;
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
