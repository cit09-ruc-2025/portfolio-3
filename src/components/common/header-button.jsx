import { Button, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const HeaderButton = ({ Route, children }) => {
  return (
    <Nav.Link as={NavLink} to={Route}>
      <Button
        style={{
          backgroundColor: "var(--primary)",
          borderColor: "var(--accent)",
        }}
      >
        {children}
      </Button>
    </Nav.Link>
  );
};

export default HeaderButton;
