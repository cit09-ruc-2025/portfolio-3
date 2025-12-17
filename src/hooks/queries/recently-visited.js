import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { fetchHttp } from "../../libs/utils/fetch";
import { urls } from "../../libs/url";
import { HTTP_METHODS } from "../../libs/constants";

export const useAddRecentlyViewed = () => {
  return useMutation({
    mutationFn: (payload) => fetchHttp({
      url: urls.recentlyVisited.base,
      options: {
        method: HTTP_METHODS.POST,
        body: payload
      }
    })
  });
};

export const useGetRecentlyViewedList = (userId) => {
  return useInfiniteQuery({
    queryKey: ["recently-viewed-list", userId],
    queryFn: ({ pageParam = 1 }) => fetchHttp({
      url: urls.recentlyVisited.base, options: {
        method: HTTP_METHODS.GET,
        params: {
          page: pageParam,

        }
      }
    }),
    getNextPageParam: (res) => {
      if (
        res.numberOfPages === 0 ||
        !res.next
      ) {
        return undefined;
      }
      const url = new URL(res.next);
      const nextPage = Number(url.searchParams.get("page"));
      return nextPage;
    },
    initialPageParam: 1,
  });
};