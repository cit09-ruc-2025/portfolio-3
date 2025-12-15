import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchHttp } from "../../libs/utils/fetch";
import { urls } from "../../libs/url";
import { HTTP_METHODS } from "../../libs/constants";

export const useGetPlaylistsByUser = (id) => {
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
        url: urls.playlist.detail.replace(":id", id),
        options: {
          method: HTTP_METHODS.GET,
        }
      })
  })
}

export const useCreatePlaylist = () => {
  return useMutation({
    mutationFn: (payload) =>
      fetchHttp({
        url: urls.playlist.base,
        options: {
          method: HTTP_METHODS.POST,
          body: payload,
        },
      }),
  });
};

export const useAddToPlaylist = () => {
  return useMutation({
    mutationFn: (payload) => {
      const { playlistId, ...rest } = payload;
      return fetchHttp({
        url: urls.playlist.add.replace(":playlistId", playlistId),
        options: {
          method: HTTP_METHODS.POST,
          body: rest,
        },
      });
    },
  });
};

export const useRemoveFromPlaylist = (playlistId, isMedia) => {
  return useMutation({
    mutationFn: (itemId) => {
      return fetchHttp({
        url: `${urls.playlist.remove.replace(":playlistId", playlistId).replace(":itemId", itemId)}?isMedia=${!!isMedia}`,
        options: {
          method: HTTP_METHODS.DELETE,
        },
      });
    },
  });
};

export const useDeletePlaylist = (id) => {
  return useMutation({
    mutationFn: () => fetchHttp({
      url: urls.playlist.delete.replace(":playlistId", id),
      options: {
        method: HTTP_METHODS.DELETE,
      }
    })
  });
};