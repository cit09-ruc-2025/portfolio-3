import {
  Badge,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  Row,
} from "react-bootstrap";
import Spinner from "../layout/spinner";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { routeUrls } from "../../libs/route";
import MovieImage from "./movie-image";

const MovieCard = ({ movieDetail }) => {
  const { id, title, imdbRating, releaseYear } = movieDetail;

  return (
    <Link
      to={routeUrls.media.replace(":id", id)}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card>
        <div style={{ height: "300px" }} className="d-flex flex-column">
          <MovieImage movieDetail={movieDetail} />
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
          {releaseYear && (
            <p
              style={{
                color: "#212529bf",
                fontSize: "13px",
                lineHeight: "12px",
              }}
            >
              {releaseYear}
            </p>
          )}
        </CardBody>
      </Card>
    </Link>
  );
};
export default MovieCard;
