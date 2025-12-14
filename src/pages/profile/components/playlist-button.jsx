import { Col, Container, Row } from "react-bootstrap";
import ProfileActionButton from "./profile-action-button";
import { List } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PlaylistButton = ({ playlist }) => {
  const { title, description, mediaIds, id } = playlist;
  const navigate = useNavigate();

  return (
    <ProfileActionButton
      onClick={() => {
        navigate("/playlists/" + id);
      }}
    >
      <Container className="d-flex flex-column gap-1">
        <Row className="justify-content-between align-items-center">
          <Col xs="auto">
            <List className="action-button-icon mb-1" />
          </Col>
          <Col xs="auto">
            <p>
              {mediaIds.length > 0 ? `${mediaIds.length} items` : "0 items"}
            </p>
          </Col>
        </Row>
        <h5 className="mb-0">{title}</h5>
        <p>{description}</p>
      </Container>
    </ProfileActionButton>
  );
};

export default PlaylistButton;
