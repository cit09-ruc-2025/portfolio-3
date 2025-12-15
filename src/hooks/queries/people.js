import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchHttp } from "../../libs/utils/fetch";
import { urls } from "../../libs/url";
import { HTTP_METHODS } from "../../libs/constants";
import { getCookie } from "../../libs/utils/cookie";

export const useGetPeopleDetail = (id) => {
  return useQuery({
    queryKey: ["people", id],
    queryFn: () =>
      fetchHttp({
        url: urls.people.detail.replace(":id", id),
        options: {
          method: HTTP_METHODS.GET,
        },
      }),
  });
};

export const useGetPeopleMedia = (id) => {
  return useInfiniteQuery({
    queryKey: ["people-media", id],
    queryFn: ({ pageParam = 1 }) =>
      fetchHttp({
        url: urls.people.media.replace(":id", id),
        options: {
          method: HTTP_METHODS.GET,
          params: {
            page: pageParam,
            pageSize: 24,
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

export const useGetPeopleUserStatus = (id) => {
  const token = getCookie("token");

  return useQuery({
    queryKey: ["people-user-status", id],
    enabled: !!token,
    queryFn: () =>
      fetchHttp({
        url: urls.people.userStatus.replace(":id", id),
        options: {
          method: HTTP_METHODS.GET,
        },
      }),
  });
};