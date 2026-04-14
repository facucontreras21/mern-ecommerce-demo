import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

const Header = () => {
  const userLogged = useSelector((state) => state.userLogged);
  const { userInfo } = userLogged || {};

  return (
    <header>
      <Navbar
        expand="lg"
        collapseOnSelect
        className="app-navbar"
        variant="dark"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="app-navbar__brand">
              Ecommerce
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="main-navbar-nav" />

          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="ms-auto app-navbar__links">
              
              {userInfo ? (
                <LinkContainer to="/profile">
                  <Nav.Link>{userInfo.name || "Mi cuenta"}</Nav.Link>
                </LinkContainer>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <Nav.Link>Sign Up</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;