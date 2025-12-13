import { useParams } from "react-router-dom";
import PageSection from "../../components/layout/page-section";
import CardGrid from "./components/card-grid";
import ProfileActionButton from "./components/profile-action-button";
import ProfileCard from "./components/profile-card";
import { Container, Row } from "react-bootstrap";

const ProfilePage = () => {
  const { username } = useParams();
  return (
    <PageSection>
      <Container className="d-flex flex-column gap-4">
        <Row>
          <CardGrid columns={1}>
            <ProfileActionButton>
              <ProfileCard username={username} />
            </ProfileActionButton>
          </CardGrid>
        </Row>
        <Row>
          <CardGrid columns={3}>
            <ProfileActionButton onClick={() => {}}>
              Action1
            </ProfileActionButton>
            <ProfileActionButton onClick={() => {}}>
              Action2
            </ProfileActionButton>
            <ProfileActionButton onClick={() => {}}>
              Action3
            </ProfileActionButton>
          </CardGrid>
        </Row>
        <h4>Playlists</h4>
        <CardGrid columns={3}>
          <ProfileActionButton onClick={() => {}}>
            Playlist1
          </ProfileActionButton>
          <ProfileActionButton onClick={() => {}}>
            Playlist2
          </ProfileActionButton>
          <ProfileActionButton onClick={() => {}}>
            Playlist3
          </ProfileActionButton>
        </CardGrid>
        <h4>Reviews</h4>
      </Container>
    </PageSection>
  );
};

export default ProfilePage;
