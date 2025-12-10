import {
  Badge,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  Row,
} from "react-bootstrap";
import { useGetMediaImage } from "../../hooks/queries/images";
import Spinner from "../layout/spinner";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { routeUrls } from "../../libs/route";

const MovieCard = ({ movieDetail }) => {
  const { id, title, imdbRating, poster, mediaType, releaseYear } = movieDetail;

  const { isLoading, data } = useGetMediaImage(id, mediaType);

  const img = data?.posters?.[0];

  const imgUrl = img
    ? `${import.meta.env.VITE_IMAGE_BASE_URL}/w185/${img.file_path}`
    : poster
    ? poster
    : "/fallback.jpg";

  return (
    <Link
      to={routeUrls.media.replace(":mediaId", id)}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card>
        <div style={{ minHeight: "300px" }}>
          {isLoading ? (
            <Spinner />
          ) : (
            <CardImg
              style={{ objectFit: "cover", height: "300px" }}
              src={imgUrl}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fallback.jpg";
              }}
            />
          )}
        </div>

        <Badge
          bg="warning"
          text="white"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            padding: "6px 10px",
            borderRadius: "6px",
            fontWeight: "600",
          }}
        >
          <Col className="d-flex align-items-center gap-1">
            <Star size="16px" />
            {parseFloat(imdbRating ?? 0).toFixed(1)}
          </Col>
        </Badge>
        <CardBody>
          <CardTitle
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "1rem",
            }}
            className="mb-1"
          >
            {title}
          </CardTitle>
          <p
            style={{
              color: "#212529bf",
              fontSize: "13px",
              lineHeight: "12px",
            }}
          >
            {releaseYear}
          </p>
        </CardBody>
      </Card>
    </Link>
  );
};
export default MovieCard;
