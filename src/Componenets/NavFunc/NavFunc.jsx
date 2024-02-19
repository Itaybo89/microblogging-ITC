import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navFunc.css";
import { NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TootContext } from "../../MyContext";

function NavFunc() {
  const { userId, setUserId } = useContext(TootContext);

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    setUserId(null);
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" id="navi">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {userId && (
              <Nav.Link href="/HomePage" className="custom-nav-link">
                HomePage
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {userId && (
              <NavDropdown title={"menu"} id="dropdown-menu">
                <NavDropdown.Item
                  as={Link}
                  to="/Profile"
                  className="custom-nav-link"
                  id="profile-settings"
                >
                  Profile Settings
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/"
                  className="custom-nav-link"
                  id="logout-settings"
                  onClick={logOut}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavFunc;
