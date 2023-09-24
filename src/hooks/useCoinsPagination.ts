import { QUERY_PARAMS, baseUrl } from "@/utils/constants";
import { useSearchParams } from "next/navigation";
import useGlobals from "./query/useGlobals";
import { composeUrl, extractSearchParams } from "@/utils/common";

export function useCoinsPagination(url = baseUrl) {
  const searchParams = useSearchParams();
  const extractedParams = extractSearchParams(searchParams);
  const { data: globals } = useGlobals();

  const pageParam = searchParams.get(QUERY_PARAMS.PAGE);
  const page = pageParam && !isNaN(+pageParam) ? +pageParam : 1;

  const perPageParam = searchParams.get(QUERY_PARAMS.PER_PAGE);
  const perPage = perPageParam && !isNaN(+perPageParam) ? +perPageParam : 100;

  const totalPages = Math.ceil(globals?.data?.active_cryptocurrencies! / perPage);
  const nextPageUrl = composeUrl(url, {
    ...extractedParams,
    page: `${Math.min(page + 1, totalPages)}`,
    per_page: `${perPage}`,
  });
  const prevPageUrl = composeUrl(url, {
    ...extractedParams,
    page: `${Math.max(page - 1, 1)}`,
    per_page: `${perPage}`,
  });

  return {
    pageParam: page,
    perPageParam: perPage,
    totalPages,
    nextPageUrl,
    prevPageUrl,
  };
}
