import { PlaySquare } from "lucide-react";
import NoData from "../../../components/common/no-data";
import Spinner from "../../../components/layout/spinner";
import { useWatchedList } from "../../../hooks/queries/watchedList";
import MovieCard from "../../../components/common/movie-card";
import { Button } from "react-bootstrap";

const WatchedList = ({ userId }) => {
  const { data, isLoading, hasNextPage, fetchNextPage } =
    useWatchedList(userId);

  if (isLoading) return <Spinner />;

  const watchedListItems = data?.pages?.flatMap((page) => page?.items);

  if (!watchedListItems?.length) {
    return (
      <NoData>
        <PlaySquare size="30" opacity="0.5" />
        <p className="m-0 fw-semibold">No results found</p>
      </NoData>
    );
  }

  return (
    <>
      <div className="watched-list-people">
        {watchedListItems?.map((item) => (
          <MovieCard movieDetail={{ ...item, id: item.mediaId }} />
        ))}
      </div>
      {hasNextPage && (
        <Button
          className="primary-button"
          style={{ width: "fit-content", alignSelf: "center" }}
          onClick={fetchNextPage}
        >
          Load more
        </Button>
      )}
    </>
  );
};

export default WatchedList;
