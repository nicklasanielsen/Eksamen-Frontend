import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink, Redirect } from "react-router-dom";
import facade from "../facade";

export default function Header({ isLoggedIn, setLoggedIn, isAdmin }) {
  const performLogout = () => {
    setLoggedIn(false);
    facade.logout();

    return <Redirect to="/membership/login" />;
  };

  return (
    <ul className="header">
      <Container>
        <Row>
          <Col md={8}>
            <li>
              <NavLink exact activeClassName="active" to="/exam/">
                Hjem
              </NavLink>
            </li>
            {isLoggedIn && (
              <>
                {isAdmin && (
                  <>
                    <li>
                      <NavLink activeClassName="active" to="/exam/admin/book">
                        Bog Administrering
                      </NavLink>
                    </li>
                    <li>
                      <NavLink activeClassName="active" to="/exam/admin/loan">
                        Låneoversigt
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        activeClassName="active"
                        to="/exam/admin/resevation"
                      >
                        Reservationer
                      </NavLink>
                    </li>
                  </>
                )}
              </>
            )}
          </Col>
          <Col md={4}>
            <li>
              <NavLink activeClassName="active" to="/exam/books">
                Se vores bøger!
              </NavLink>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <NavLink activeClassName="active" to="/exam/profile">
                    Min Profil
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName=""
                    to="/exam/membership/login"
                    onClick={performLogout}
                  >
                    Log ud
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink activeClassName="active" to="/exam/membership/login">
                    Log på
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="active"
                    to="/exam/membership/register"
                  >
                    Opret konto
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
