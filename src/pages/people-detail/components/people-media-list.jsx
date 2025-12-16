import { Button, Col, Row } from "react-bootstrap";
import Spinner from "../../../components/layout/spinner";
import { useGetPeopleMedia } from "../../../hooks/queries/people";
import MovieCard from "../../../components/common/movie-card";

const PeopleMediaList = ({ id }) => {
  const { isLoading, data, fetchNextPage, hasNextPage } = useGetPeopleMedia(id);

  if (isLoading) {
    return <Spinner />;
  }

  const mediaList = data?.pages?.flatMap((page) => page.items);

  if (!mediaList?.length) {
    return <p>No data</p>;
  }

  return (
    <div className="search-result">
      {mediaList?.map((media, i) => (
        <Col key={i}>
          <MovieCard movieDetail={{ ...media, id: media.mediaId }} />
        </Col>
      ))}
      {hasNextPage && (
        <Button className="primary-button" onClick={fetchNextPage}>
          Show More
        </Button>
      )}
    </div>
  );
};

export default PeopleMediaList;
