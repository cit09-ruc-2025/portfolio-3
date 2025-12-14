import { useQuery } from "@tanstack/react-query";
import { fetchHttp } from "../../libs/utils/fetch";
import { urls } from "../../libs/url";
import { HTTP_METHODS } from "../../libs/constants";

export const useGetUserDetails = (username) => {
  return useQuery({
    queryKey: ["user", username],
    queryFn: () =>
      fetchHttp({
        url: urls.user.details.replace(":username", username),
        options: {
          method: HTTP_METHODS.GET,
        },
      }),
  });
};

export const useGetUserReviews = (id) => {
  return useQuery({
    queryKey: ["userReviews", id],
    queryFn: () =>
      fetchHttp({
        url: urls.user.reviews.replace(":id", id),
        options: {
          method: HTTP_METHODS.GET,
        },
      }),
  });
};
