import { useGetMediaImage } from "../../hooks/queries/images";
import Spinner from "../layout/spinner";
import { CardImg } from "react-bootstrap";

const MovieImage = ({ movieDetail, height, width, fit }) => {
  const { id, poster, mediaType } = movieDetail;

  const { isLoading, data } = useGetMediaImage(id, mediaType);

  const img = data?.posters?.[0];

  const imgUrl = img
    ? `${import.meta.env.VITE_IMAGE_BASE_URL}/w185/${img.file_path}`
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
