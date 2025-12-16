import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { urls } from "../../libs/url";
import { HTTP_METHODS } from "../../libs/constants";
import { fetchHttp } from "../../libs/utils/fetch";
import { getCookie } from "../../libs/utils/cookie";

export const useGetMediaList = ({ page, perPage, orderBy }) => {
  return useQuery({
    queryKey: ["media-list", page, perPage],
    queryFn: () =>
      fetchHttp({
        url: urls.media.list,
        options: {
          method: HTTP_METHODS.GET,
          params: {
            ...(page && { page }),
            ...(perPage && { pageSize: perPage }),
            ...(orderBy && { orderBy }),
          },
        },
      }),
  });
};

export const useGetMediaDetail = (id) => {
  return useQuery({
    queryKey: ["media", id],
    queryFn: () =>
      fetchHttp({
        url: urls.media.detail.replace(":id", id),
        options: {
          method: HTTP_METHODS.GET,
        },
      }),
  });
};

export const useGetMediaPeople = (id) => {
  return useInfiniteQuery({
    queryKey: ["media-people", id],
    queryFn: ({ pageParam = 1 }) =>
      fetchHttp({
        url: urls.media.people.replace(":id", id),
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

export const useGetEpisodesList = (id) => {
  return useQuery({
    queryKey: ["media-episode", id],
    queryFn: () =>
      fetchHttp({
        url: urls.media.episodes.replace(":id", id),
        options: {
          method: HTTP_METHODS.GET,
        },
      }),
  });
};

export const useGetMediaReviews = (id) => {
  return useInfiniteQuery({
    queryKey: ["media-reviews", id],
    queryFn: ({ pageParam = 1 }) =>
      fetchHttp({
        url: urls.media.reviews.replace(":id", id),
        options: {
          method: HTTP_METHODS.GET,
          params: {
            page: pageParam,
            pageSize: 10,
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

export const useGetMediaUserStatus = (id) => {
  const token = getCookie("token");

  return useQuery({
    queryKey: ["media-user-status", id],
    enabled: !!token,
    queryFn: () =>
      fetchHttp({
        url: urls.media.userStatus.replace(":id", id),
        options: {
          method: HTTP_METHODS.GET,
        },
      }),
  });
};