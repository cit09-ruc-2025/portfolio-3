import { Card, Row, Col } from "react-bootstrap";

function ProfileCard({ username }) {
  return (
    <Card className="profile-action-button">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs="auto">
            <img
              className="rounded-circle"
              style={{ width: "150px", aspectRatio: "1", objectFit: "cover" }}
              src="/people-fallback.png"
            />
          </Col>

          <Col>
            <h5>{username}</h5>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ProfileCard;
