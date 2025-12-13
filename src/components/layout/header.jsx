import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import HeaderButton from "../common/header-button";

const Header = () => {
  return (
    <Navbar
      style={{ backgroundColor: "var(--accent)" }}
      expand="lg"
      sticky="top"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          CinemaScoop
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <HeaderButton Route="/auth">Login</HeaderButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
