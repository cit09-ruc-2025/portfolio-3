import { useParams } from "react-router-dom";
import PageSection from "../../components/layout/page-section";
import CardGrid from "./components/card-grid";
import ProfileActionButton from "./components/profile-action-button";
import ProfileCard from "./components/profile-card";
import { Container, Row, Col } from "react-bootstrap";
import { Clock, Search, Star } from "lucide-react";

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
              <Container className="d-flex flex-column gap-1">
                <Row>
                  <Col xs={2}>
                    <Clock className="action-button-icon" />
                  </Col>
                  <Col>
                    <h5>Watch History</h5>
                  </Col>
                </Row>
                <p>View your watch history</p>
              </Container>
            </ProfileActionButton>
            <ProfileActionButton onClick={() => {}}>
              <Container className="d-flex flex-column gap-1">
                <Row>
                  <Col xs={2}>
                    <Search className="action-button-icon" />
                  </Col>
                  <Col>
                    <h5>Search History</h5>
                  </Col>
                </Row>
                <p>Recent search history</p>
              </Container>
            </ProfileActionButton>
            <ProfileActionButton onClick={() => {}}>
              <Container className="d-flex flex-column gap-1">
                <Row>
                  <Col xs={2}>
                    <Star className="action-button-icon" />
                  </Col>
                  <Col>
                    <h5>Favorites</h5>
                  </Col>
                </Row>
                <p>Your favorite content</p>
              </Container>
            </ProfileActionButton>
          </CardGrid>
        </Row>
        <Row>
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
        </Row>
        <h4>Reviews</h4>
      </Container>
    </PageSection>
  );
};

export default ProfilePage;
