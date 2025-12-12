import { Star } from "lucide-react";
import { Badge, Col, Container } from "react-bootstrap";
import { useGetImage } from "../../hooks/queries/images";
import Spinner from "../../components/layout/spinner";
import { useState } from "react";

const MediaHeader = ({ title, averageRating, id, hasEpisodes, isEpisode }) => {
  const [imgError, setImgError] = useState(false);

  const { data, isLoading } = useGetImage(id);

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <>Error</>;
  }

  const { tv_results, movie_results, tv_episode_results } = data;

  let poster = null;

  if (hasEpisodes) {
    poster = tv_results?.[0]?.poster_path;
  } else if (isEpisode) {
    poster = tv_episode_results?.[0]?.still_path;
  } else {
    poster = movie_results?.[0]?.poster_path;
  }

  return (
    <Col
      style={{ overflow: "hidden", position: "relative" }}
      className="d-flex align-items-end text-white"
    >
      {!imgError && poster && (
        <img
          src={`${import.meta.env.VITE_IMAGE_BASE_URL}/original/${poster}`}
          alt={title}
          onError={() => setImgError(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
      )}
      <div className="media-banner-overlay"></div>
      <Container
        className="align-items-end pb-2"
        style={{
          zIndex: 1,
          marginBottom: "20px",
        }}
      >
        <h1>{title}</h1>
        <div className="d-flex gap-2 align-items-start">
          <Badge
            bg="dark"
            style={{
              width: "fit-content",
              opacity: "0.8",
            }}
          >
            <div className="d-flex align-items-center gap-1 px-2">
              <Star size="16px" className="text-warning" />
              {parseFloat(averageRating ?? 0).toFixed(1)}
            </div>
          </Badge>
        </div>
      </Container>
    </Col>
  );
};

export default MediaHeader;
