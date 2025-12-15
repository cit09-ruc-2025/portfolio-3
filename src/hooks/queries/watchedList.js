import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { urls } from "../../libs/url";
import { HTTP_METHODS } from "../../libs/constants";
import { fetchHttp } from "../../libs/utils/fetch";

export const useWatchedList = (userId) => {
  return useInfiniteQuery({
    queryKey: ["watched-list", userId],
    queryFn: ({ pageParam = 1 }) => fetchHttp({
      url: urls.watchedList.base.replace(":id", userId), options: {
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

export const useAddToWatched = (userId) => {
  return useMutation({
    mutationFn: (payload) => fetchHttp({
      url: urls.watchedList.base.replace(":id", userId),
      options: {
        method: HTTP_METHODS.POST,
        body: payload
      }
    })
  });
};

export const useRemoveFromWatched = (userId) => {
  return useMutation({
    mutationFn: (mediaId) => fetchHttp({
      url: urls.watchedList.delete.replace(":id", userId).replace(":mediaId", mediaId),
      options: {
        method: HTTP_METHODS.DELETE,
      }
    })
  });
};
