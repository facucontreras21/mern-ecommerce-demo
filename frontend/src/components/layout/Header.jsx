import React from "react";
import { logoutAction } from "../../redux/actions/user/userAuthActions";
import { useDispatch, useSelector } from "react-redux";

import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.userLogged);

  const logout = () => {
    dispatch(logoutAction());
    window.location.href = "/"; //linea en observacion
  };

  return (
    <>
      <header>
        <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Ecommerce</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i>Carrito
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
                {!isLoggedIn ? (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i>Login
                    </Nav.Link>
                  </LinkContainer>
                ) : (
                  <NavDropdown title={user.name} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/rutaNoSeUsa">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => logout()}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
