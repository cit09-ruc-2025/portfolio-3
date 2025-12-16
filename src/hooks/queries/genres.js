import { useQuery } from "@tanstack/react-query";
import { fetchHttp } from "../../libs/utils/fetch";
import { urls } from "../../libs/url";
import { HTTP_METHODS } from "../../libs/constants";

export const useGetGenres = ({ page, perPage }) => {
  return useQuery({
    queryKey: ["genres", page, perPage],
    queryFn: () =>
      fetchHttp({
        url: urls.genre,
        options: {
          method: HTTP_METHODS.GET,
          params: {
            ...(page && { page }),
            ...(perPage && { pageSize: perPage }),
          },
        },
      }),
  });
};

export const useGetGenreMedia = ({ id, page, perPage }) => {
  return useQuery({
    queryKey: ["genreMedia", id, page, perPage],
    queryFn: () =>
      fetchHttp({
        url: urls.genre.genreMedia.replace(":id", id),
        options: {
          method: HTTP_METHODS.GET,
          params: {
            ...(page && { page }),
            ...(perPage && { pageSize: perPage }),
          },
        },
      }),
  });
};
