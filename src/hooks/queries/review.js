import { useMutation } from "@tanstack/react-query";
import { fetchHttp } from "../../libs/utils/fetch";
import { urls } from "../../libs/url";
import { HTTP_METHODS } from "../../libs/constants";

export const useAddReview = (id) => {
  return useMutation({
    mutationFn: (payload) => fetchHttp({
      url: urls.review.add.replace(":mediaId", id),
      options: {
        method: HTTP_METHODS.PUT,
        body: payload
      }
    })
  });
};