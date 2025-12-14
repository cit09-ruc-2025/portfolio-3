import { Card, Row, Col } from "react-bootstrap";

function ProfileCard({ user }) {
  const { username, createdAt } = user;
  return (
    <Card className="profile-action-button" style={{ border: "none" }}>
      <Card.Body>
        <Row>
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
          <Col>
            <b>Member Since: </b> {createdAt}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ProfileCard;
