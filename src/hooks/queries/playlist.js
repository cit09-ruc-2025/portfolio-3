import { useQuery } from "@tanstack/react-query";
import { fetchHttp } from "../../libs/utils/fetch";
import { urls } from "../../libs/url";
import { HTTP_METHODS } from "../../libs/constants";

export const useGetPlaylists = (id) => {
  return useQuery({
    queryKey: ["playlists", id],
    queryFn: () =>
      fetchHttp({
        url: urls.playlist.userplaylists.replace(":id", id),
        options: {
          method: HTTP_METHODS.GET,
        },
      }),
  });
};

export const useGetPlaylist = (id) => {
  return useQuery({
    queryKey: ["playlist", id],
    queryFn: () =>
      fetchHttp({
        url: urls.playlist.userplaylist.replace(":id", id),
        options: {
          method: HTTP_METHODS.GET,
        },
      }),
  });
};
