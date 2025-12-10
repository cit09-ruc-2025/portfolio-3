import { useQuery } from "@tanstack/react-query";

export function useGetMediaImage(id, mediaType) {
  console.log(mediaType);
  let url = `${import.meta.env.VITE_TMDB_BASE_URL}/:mediaType/${id}/images?api_key=${import.meta.env.VITE_TMDB_API_KEY}`

  if (mediaType === "movie" || mediaType === "tvMovie") {
    url = url.replace(":mediaType", "movie")
  }
  else if (mediaType === "tvSeries" || mediaType === "tvMiniSeries") {
    console.log("ok")
    url = url.replace(":mediaType", "tv");
    console.log(url)
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
