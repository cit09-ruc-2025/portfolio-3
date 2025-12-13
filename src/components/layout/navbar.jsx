import { User } from "lucide-react";
import {
  Navbar as BootstrapNavbar,
  Container,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { routeUrls } from "../../libs/route";
import { getCookie } from "../../libs/utils/cookie";
import SearchBar from "../common/search-bar";

const Navbar = () => {
  const token = getCookie("token");
  const user = getCookie("username");
  return (
    <BootstrapNavbar
      expand="lg"
      className="border-bottom px-5"
      style={{ background: "var(--accent)" }}
    >
      <Container fluid>
        <BootstrapNavbar.Brand
          as={Link}
          to={routeUrls.homepage}
          style={{
            background: "var(--primary)",
            color: "white",
            borderRadius: "12px",
            padding: "3px 4px",
            fontSize: "17px",
          }}
        >
          Cinema
        </BootstrapNavbar.Brand>
        <div className="d-flex justify-content-end gap-2">
          <SearchBar />

          <Dropdown align="end">
            <Dropdown.Toggle
              variant="light"
              id="dropdown-profile"
              className="border-0 dropdown-toggle-no-caret"
              style={{
                display: "flex",
                borderRadius: "50%",
                background: "var(--tertiary)",
                width: "40px",
                height: "40px",
                padding: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <User />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {user && token ? (
                <>
                  <Dropdown.Item
                    as={Link}
                    to={routeUrls.profile.replace(":username", user)}
                  >
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className="text-danger">Logout</Dropdown.Item>
                </>
              ) : (
                <Dropdown.Item as={Link} to={routeUrls.auth}>
                  Login
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </BootstrapNavbar>
  );
};
export default Navbar;
