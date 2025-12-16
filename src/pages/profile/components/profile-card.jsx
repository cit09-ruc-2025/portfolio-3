import { Card, Row, Col } from "react-bootstrap";
import { getFormattedDate } from "../../../libs/utils";

function ProfileCard({ user }) {
  const { username, createdAt } = user;
  return (
    <Card
      className="profile-action-button"
      style={{ border: "1px solid #c9c9c9" }}
    >
      <Card.Body>
        <Col className="d-flex justify-content-between align-items-start flex-row">
          <Col className="d-flex gap-2 align-items-start">
            <img
              className="rounded-circle"
              style={{ width: "80px", aspectRatio: "1", objectFit: "cover" }}
              src="/people-fallback.png"
            />
            <h5 className="mt-2">{username}</h5>
          </Col>
          <p className="m-0">
            <span className="fw-semibold">Member Since </span>
            {getFormattedDate(createdAt)}
          </p>
        </Col>
      </Card.Body>
    </Card>
  );
}

export default ProfileCard;
