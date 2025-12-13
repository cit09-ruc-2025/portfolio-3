import { Button, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const HeaderButton = ({ Route, children }) => {
  return (
    <Nav.Link as={NavLink} to={Route}>
      <Button className="primary-button">{children}</Button>
    </Nav.Link>
  );
};

export default HeaderButton;
