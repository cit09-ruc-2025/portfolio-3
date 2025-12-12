import { useMutation } from "@tanstack/react-query";
import { fetchHttp } from "../../libs/utils/fetch";
import { urls } from "../../libs/url";
import { HTTP_METHODS } from "../../libs/constants";

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload) => fetchHttp({
      url: urls.auth.login,
      options: {
        method: HTTP_METHODS.POST,
        body: payload
      }
    })
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: (payload) => fetchHttp({
      url: urls.auth.signup,
      options: {
        method: HTTP_METHODS.POST,
        body: payload
      }
    })
  });
};