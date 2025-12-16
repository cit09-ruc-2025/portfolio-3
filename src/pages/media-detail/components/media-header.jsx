import { Clock, ClockCheck, Heart, Star } from "lucide-react";
import { useState } from "react";
import { Badge, Button, Col, Container } from "react-bootstrap";
import Spinner from "../../../components/layout/spinner";
import { useGetImage } from "../../../hooks/queries/images";
import { getCookie } from "../../../libs/utils/cookie";
import {
  useAddToWatched,
  useRemoveFromWatched,
} from "../../../hooks/queries/watchedList";
import { queryClient } from "../../../context/query-client-provider";
import AddToFav from "../../../components/common/add-to-fav";
import AddToPlaylist from "./add-to-playlist";

const MediaHeader = ({
  title,
  averageRating,
  id,
  hasEpisodes,
  isEpisode,
  isWatched,
  isFavorite,
  playLists,
}) => {
  const [imgError, setImgError] = useState(false);

  const { data, isLoading } = useGetImage(id);

  const token = getCookie("token");
  const userId = getCookie("userId");

  const { mutate: addToWatched, isPending } = useAddToWatched(userId);
  const { mutate: removeFromWatched, isPending: isRemovePending } =
    useRemoveFromWatched(userId);

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

  const handleWatched = () => {
    if (isWatched) {
      removeFromWatched(id, {
        onSuccess: () => {
          queryClient.invalidateQueries(["media-user-status"]);
        },
      });
    } else {
      addToWatched(
        { mediaId: id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["media-user-status"]);
          },
        }
      );
    }
  };

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
        <div className="d-flex align-items-center gap-2">
          <h1>{title}</h1>
          {!!token && !isEpisode && (
            <>
              <AddToFav isFavorite={isFavorite} isMedia id={id} />
              <Button
                className={`${
                  isWatched ? "primary-button" : "secondary-button"
                } media-action-button`}
                onClick={handleWatched}
                disabled={isPending || isRemovePending}
              >
                {isWatched ? "Watched" : "Mark as Watched"}
              </Button>
              <AddToPlaylist
                itemId={id}
                playListIds={playLists}
                isMedia={true}
              />
            </>
          )}
        </div>
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
