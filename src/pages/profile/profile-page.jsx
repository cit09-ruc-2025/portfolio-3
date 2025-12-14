import { useParams } from "react-router-dom";
import PageSection from "../../components/layout/page-section";
import CardGrid from "./components/card-grid";
import ProfileActionButton from "./components/profile-action-button";
import ProfileCard from "./components/profile-card";
import { Container, Row } from "react-bootstrap";
import { Clock, Search, Star } from "lucide-react";
import PlaylistList from "./components/playlist-list";
import { useGetUserDetails } from "../../hooks/queries/user";
import Spinner from "../../components/layout/spinner";

const ProfilePage = () => {
  const { username } = useParams();
  const { isLoading, data } = useGetUserDetails(username);

  if (isLoading)
    return (
      <PageSection>
        <Spinner />
      </PageSection>
    );
  if (!data) return <p>An error occurred.</p>;

  return (
    <PageSection>
      <Container className="d-flex flex-column gap-4">
        <Row>
          <CardGrid columns={1}>
            <ProfileActionButton>
              <ProfileCard user={data} />
            </ProfileActionButton>
          </CardGrid>
        </Row>
        <Row>
          <CardGrid columns={3}>
            <ProfileActionButton onClick={() => {}}>
              <Container className="d-flex flex-column gap-1">
                <Clock className="action-button-icon mb-1" />
                <h5 className="mb-0">Watch History</h5>
                <p>View your watch history</p>
              </Container>
            </ProfileActionButton>
            <ProfileActionButton onClick={() => {}}>
              <Container className="d-flex flex-column gap-1">
                <Search className="action-button-icon mb-1" />
                <h5 className="mb-0">Search History</h5>
                <p>Recent search history</p>
              </Container>
            </ProfileActionButton>
            <ProfileActionButton onClick={() => {}}>
              <Container className="d-flex flex-column gap-1">
                <Star className="action-button-icon mb-1" />
                <h5 className="mb-0">Favorites</h5>
                <p>Your favorite content</p>
              </Container>
            </ProfileActionButton>
          </CardGrid>
        </Row>
        {data && (
          <Row>
            <h4>Playlists</h4>
            <PlaylistList id={data.id} />
          </Row>
        )}
        <h4>Reviews</h4>
      </Container>
    </PageSection>
  );
};

export default ProfilePage;
