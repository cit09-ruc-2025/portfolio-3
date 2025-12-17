import { useParams } from "react-router-dom";
import { useGetGenreMedia } from "../../hooks/queries/genres";
import Spinner from "../../components/layout/spinner";
import ErrorComponent from "../../components/layout/error-component";
import { Badge, Col, Container } from "react-bootstrap";
import CardGrid from "../../components/layout/card-grid";
import MovieCard from "../../components/common/movie-card";
import GenreSuggestionList from "../home/components/genre-suggestion-list";

const GenreMediaPage = () => {
  const { genreName } = useParams();
  const { isLoading, isError, data, error } = useGetGenreMedia({
    genreName: genreName,
    page: 1,
    perPage: 20,
  });

  if (isLoading) return <Spinner />;

  if (isError || !data) {
    return (
      <ErrorComponent
        errorMessage={
          error?.status === 404
            ? "Playlist does not exist"
            : "An error occurred."
        }
      />
    );
  }

  return (
    <Container className="d-flex flex-column gap-4 mt-2">
      <GenreSuggestionList />

      {!data?.items?.length ? (
        <ErrorComponent errorMessage="The playlist is empty..." />
      ) : (
        <div className="d-flex flex-column gap-4">
          {!!data?.items?.length && (
            <>
              <Col className="d-flex justify-content-between align-items-start mt-2">
                <h5 style={{ "text-transform": "capitalize" }}>{genreName}</h5>
                <Badge bg="secondary" style={{ borderRadius: "10px" }}>
                  {`${data?.items?.length} ${
                    data?.items?.length > 1 ? "items" : "item"
                  }`}
                </Badge>
              </Col>
              <CardGrid columns={4}>
                {data.items.map((media) => (
                  <MovieCard movieDetail={media} />
                ))}
              </CardGrid>
            </>
          )}
        </div>
      )}
    </Container>
  );
};

export default GenreMediaPage;
