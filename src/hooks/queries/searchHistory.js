import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { fetchHttp } from "../../libs/utils/fetch";
import { urls } from "../../libs/url";
import { HTTP_METHODS } from "../../libs/constants";

export const useGetSearchHistory = (id) => {
  return useInfiniteQuery({
    queryKey: ["search-history", id],
    queryFn: ({ pageParam = 1 }) =>
      fetchHttp({
        url: urls.searchHistory.base,
        options: {
          method: HTTP_METHODS.GET,
          params: {
            page: pageParam,
          },
        },
      }),
    getNextPageParam: (res) => {
      if (res.numberOfPages === 0 || !res.next) {
        return undefined;
      }
      const url = new URL(res.next);
      const nextPage = Number(url.searchParams.get("page"));
      return nextPage;
    },
    initialPageParam: 1,
  });
};

export const useAddSearchHistory = () => {
  return useMutation({
    mutationFn: (keyword) => fetchHttp({
      url: urls.searchHistory.base,
      options: {
        method: HTTP_METHODS.POST,
        params: {
          keyword
        }
      }
    })
  });
};