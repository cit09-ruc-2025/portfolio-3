import { useMutation } from "@tanstack/react-query";
import { fetchHttp } from "../../libs/utils/fetch";
import { urls } from "../../libs/url";
import { HTTP_METHODS } from "../../libs/constants";

export const useAddReview = (id) => {
  return useMutation({
    mutationFn: (payload) => fetchHttp({
      url: urls.review.base.replace(":mediaId", id),
      options: {
        method: HTTP_METHODS.PUT,
        body: payload
      }
    })
  });
};

export const useDeleteReview = (id) => {
  return useMutation({
    mutationFn: () => fetchHttp({
      url: urls.review.base.replace(":mediaId", id),
      options: {
        method: HTTP_METHODS.DELETE,
      }
    })
  });
};