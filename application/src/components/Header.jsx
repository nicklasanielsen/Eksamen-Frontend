import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink, Redirect } from "react-router-dom";
import facade from "../facade";

export default function Header({ isLoggedIn, setLoggedIn, isAdmin }) {
  const performLogout = () => {
    setLoggedIn(false);
    facade.logout();

    return <Redirect to="/fanclub/login" />;
  };

  return (
    <ul className="header">
      <Container>
        <Row>
          <Col md={8}>
            <li>
              <NavLink exact activeClassName="active" to="/exam/">
                Home
              </NavLink>
            </li>
            {isLoggedIn && (
              <>
                <li>
                  <NavLink activeClassName="active" to="/exam/jokes">
                    Jokes
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/exam/info/user">
                    Find User
                  </NavLink>
                </li>
                {isAdmin && (
                  <li>
                    <NavLink activeClassName="active" to="/exam/info/users">
                      All Users
                    </NavLink>
                  </li>
                )}
              </>
            )}
          </Col>
          <Col md={4}>
            {isLoggedIn ? (
              <>
                <li>
                  <NavLink activeClassName="active" to="/exam/profile">
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName=""
                    to="/exam/fanclub/login"
                    onClick={performLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink activeClassName="active" to="/exam/fanclub/login">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/exam/fanclub/register">
                    Join Our Fan Club!
                  </NavLink>
                </li>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </ul>
  );
}
