import { useParams } from "react-router-dom";
import { useGetPlaylist } from "../../hooks/queries/playlist";
import Spinner from "../../components/layout/spinner";
import MovieCard from "../../components/common/movie-card";
import CardGrid from "../../components/layout/card-grid";
import { Container } from "react-bootstrap";
import PageSection from "../../components/layout/page-section";

const PlaylistPage = () => {
  const { id, username } = useParams();
  const { isLoading, isError, data } = useGetPlaylist(id);

  if (isLoading) return <Spinner />;
  if (isError) return <p>An error occurred.</p>;
  if (!data) return <p>The playlist is empty...</p>;

  return (
    <PageSection>
      <Container className="d-flex flex-column gap-4">
        <h5>
          {username}'s {data.title}
        </h5>
        <p>"{data.description}"</p>
        <CardGrid columns={6}>
          {data.media.map((media) => (
            <MovieCard movieDetail={media} />
          ))}
        </CardGrid>
      </Container>
    </PageSection>
  );
};

export default PlaylistPage;
