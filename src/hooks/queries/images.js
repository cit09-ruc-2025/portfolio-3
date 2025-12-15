import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { urls } from "../../libs/url";
import { HTTP_METHODS } from "../../libs/constants";
import { fetchHttp } from "../../libs/utils/fetch";

export function useGetMediaImage(id, mediaType) {
  let url = `${import.meta.env.VITE_TMDB_BASE_URL}/:mediaType/${id}/images?api_key=${import.meta.env.VITE_TMDB_API_KEY}`

  if (mediaType === "movie" || mediaType === "tvMovie") {
    url = url.replace(":mediaType", "movie")
  }
  else if (mediaType === "tvSeries" || mediaType === "tvMiniSeries" || mediaType === "tv") {
    url = url.replace(":mediaType", "tv");
  }
  return useQuery({
    queryKey: ["tmdb-images", id],
    queryFn: async () => {
      const res = await fetch(url
      );
      return res.json();
    },
  });
}

export function useGetImage(id) {
  return useQuery({
    queryKey: ["tmdb-images", id],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_TMDB_BASE_URL}/find/${id}?external_source=imdb_id&api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      return res.json();
    },
  });
}

export const useGetFavoriteMediaList = (userId) => {
  return useInfiniteQuery({
    queryKey: ["favorite-media", userId],
    queryFn: ({ pageParam = 1 }) => fetchHttp({
      url: urls.favorite.media.base.replace(":id", userId), options: {
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

export const useGetFavoritePeopleList = (userId) => {
  return useInfiniteQuery({
    queryKey: ["favorite-people", userId],
    queryFn: ({ pageParam = 1 }) => fetchHttp({
      url: urls.favorite.people.base.replace(":id", userId), options: {
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