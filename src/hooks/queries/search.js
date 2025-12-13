import { useInfiniteQuery } from "@tanstack/react-query";
import { HTTP_METHODS } from "../../libs/constants";
import { urls } from "../../libs/url";
import { fetchHttp } from "../../libs/utils/fetch";

export const useSearchMedia = (keyword) => {
  return useInfiniteQuery({
    queryKey: ["search-media", keyword],
    enabled: keyword?.trim().length > 0,
    queryFn: ({ pageParam = 1 }) => fetchHttp({
      url: urls.search.media, options: {
        method: HTTP_METHODS.GET,
        params: {
          page: pageParam,
          keyword
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

export const useSearchPeople = (keyword) => {
  return useInfiniteQuery({
    queryKey: ["search-people", keyword],
    enabled: keyword?.trim().length > 0,
    queryFn: ({ pageParam = 1 }) => fetchHttp({
      url: urls.search.people, options: {
        method: HTTP_METHODS.GET,
        params: {
          page: pageParam,
          keyword
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