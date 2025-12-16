import { Badge, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MovieCard from "../../components/common/movie-card";
import CardGrid from "../../components/layout/card-grid";
import ErrorComponent from "../../components/layout/error-component";
import PageSection from "../../components/layout/page-section";
import Spinner from "../../components/layout/spinner";
import { useGetPlaylist } from "../../hooks/queries/playlist";
import PeopleCard from "../../components/common/people-card";

const PlaylistPage = () => {
  const { id, username } = useParams();
  const { isLoading, isError, data, error } = useGetPlaylist(id);

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
      <Row>
        <h3 className="m-0">
          {username}'s {data.title}
        </h3>
        {data.description && <p>{data.description}</p>}
      </Row>
      {!data?.media?.length && !data?.people?.length ? (
        <ErrorComponent errorMessage="The playlist is empty..." />
      ) : (
        <div className="d-flex flex-column gap-4">
          {!!data?.media?.length && (
            <>
              <Col className="d-flex justify-content-between align-items-start mt-2">
                <h5>Media</h5>
                <Badge bg="secondary" style={{ borderRadius: "10px" }}>
                  {`${data?.media?.length} ${
                    data?.media?.length > 1 ? "items" : "item"
                  }`}
                </Badge>
              </Col>
              <CardGrid columns={4}>
                {data.media.map((media) => (
                  <MovieCard
                    movieDetail={{ ...media, title: media.displayTitle }}
                  />
                ))}
              </CardGrid>
            </>
          )}
          {!!data?.people?.length && (
            <>
              <Col className="d-flex justify-content-between align-items-start mt-2">
                <h5>People</h5>
                <Badge bg="secondary" style={{ borderRadius: "10px" }}>
                  {`${data?.people?.length} ${
                    data?.people?.length > 1 ? "items" : "item"
                  }`}
                </Badge>
              </Col>
              <CardGrid columns={4}>
                {data.people.map((people) => (
                  <PeopleCard
                    people={{ peopleId: people.id, personName: people.name }}
                  />
                ))}
              </CardGrid>
            </>
          )}
        </div>
      )}
    </Container>
  );
};

export default PlaylistPage;
