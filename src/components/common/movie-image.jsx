import { CardImg } from "react-bootstrap";
import { useGetImage } from "../../hooks/queries/images";
import ErrorComponent from "../layout/error-component";
import Spinner from "../layout/spinner";

const MovieImage = ({ movieDetail, height, width, fit }) => {
  const { id, poster, hasEpisodes } = movieDetail;

  const { isLoading, data } = useGetImage(id);

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <ErrorComponent />;
  }

  const { tv_results, movie_results } = data;

  let movieThumbnail = null;

  if (hasEpisodes) {
    movieThumbnail = tv_results?.[0]?.poster_path;
  } else {
    movieThumbnail = movie_results?.[0]?.poster_path;
  }

  const imgUrl = movieThumbnail
    ? `${import.meta.env.VITE_IMAGE_BASE_URL}/w185/${movieThumbnail}`
    : poster
    ? poster
    : "/fallback.jpg";

  if (isLoading) return <Spinner />;

  return (
    <CardImg
      style={{
        objectFit: fit ?? "cover",
        height: height ?? "300px",
        width: width ?? null,
      }}
      src={imgUrl}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "/fallback.jpg";
      }}
    />
  );
};

export default MovieImage;
