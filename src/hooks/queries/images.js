import { useQuery } from "@tanstack/react-query";

export function useGetMediaImage(id, mediaType) {
  let url = `${import.meta.env.VITE_TMDB_BASE_URL}/:mediaType/${id}/images?api_key=${import.meta.env.VITE_TMDB_API_KEY}`

  if (mediaType === "movie" || mediaType === "tvMovie") {
    url = url.replace(":mediaType", "movie")
  }
  else if (mediaType === "tvSeries" || mediaType === "tvMiniSeries" || mediaType === "tv") {
    url = url.replace(":mediaType", "tv");
  }
  return useQuery({
    queryKey: ["tmdb-images", id],
    queryFn: async () => {
      const res = await fetch(url
      );
      return res.json();
    },
  });
}

export function useGetImage(id) {
  return useQuery({
    queryKey: ["tmdb-images", id],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_TMDB_BASE_URL}/find/${id}?external_source=imdb_id&api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      return res.json();
    },
  });
}
