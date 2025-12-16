import { useMutation } from "@tanstack/react-query";
import { fetchHttp } from "../../libs/utils/fetch";
import { urls } from "../../libs/url";
import { HTTP_METHODS } from "../../libs/constants";
import { deleteCookie } from "../../libs/utils/cookie";
import { useNavigate } from "react-router-dom";
import { routeUrls } from "../../libs/route";

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload) =>
      fetchHttp({
        url: urls.auth.login,
        options: {
          method: HTTP_METHODS.POST,
          body: payload,
        },
      }),
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: (payload) =>
      fetchHttp({
        url: urls.auth.signup,
        options: {
          method: HTTP_METHODS.POST,
          body: payload,
        },
      }),
  });
};

export function useLogout() {
  const navigate = useNavigate();

  return () => {
    deleteCookie("token");
    deleteCookie("username");
    deleteCookie("userId");

    navigate(routeUrls.homepage, { replace: true });
  };
}
