import { Card } from "react-bootstrap";

function ProfileActionButton({ children, onClick }) {
  const clickable = Boolean(onClick);

  return (
    <Card
      className={`profile-action-button ${
        clickable ? "profile-action-button-clickable" : ""
      }`}
      onClick={onClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      <Card.Body>{children}</Card.Body>
    </Card>
  );
}

export default ProfileActionButton;
