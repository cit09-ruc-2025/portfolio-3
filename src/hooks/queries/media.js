import { useQuery } from "@tanstack/react-query";
import { urls } from "../../libs/url";
import { HTTP_METHODS } from "../../libs/constants";
import { fetchHttp } from "../../libs/utils/fetch";

export const useGetMediaList = ({ page, perPage, orderBy }) => {
  return useQuery({
    queryKey: ["media-list", page, perPage],
    queryFn: () => fetchHttp({
      url: urls.media.list, options: {
        method: HTTP_METHODS.GET,
        params: {
          ...(page && { page }),
          ...(perPage && { pageSize: perPage }),
          ...(orderBy && { orderBy }),
        }
      }
    })
  });
};
