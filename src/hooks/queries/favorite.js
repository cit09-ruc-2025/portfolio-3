import { useMutation } from "@tanstack/react-query";
import { fetchHttp } from "../../libs/utils/fetch";
import { urls } from "../../libs/url";
import { HTTP_METHODS } from "../../libs/constants";

export const useAddToFavorite = (userId, isMedia) => {
  return useMutation({
    mutationFn: (payload) => fetchHttp({
      url: isMedia ?
        urls.favorite.media.base.replace(":id", userId) :
        urls.favorite.people.base.replace(":id", userId),
      options: {
        method: HTTP_METHODS.POST,
        body: payload
      }
    })
  });
};

export const useRemoveFromFavorite = (userId, isMedia) => {
  return useMutation({
    mutationFn: (id) => fetchHttp({
      url: isMedia ?
        urls.favorite.media.delete.replace(":id", userId).replace(":itemId", id) :
        urls.favorite.people.delete.replace(":id", userId).replace(":itemId", id),
      options: {
        method: HTTP_METHODS.DELETE,
      }
    })
  });
};
