import { Form, Button, Alert } from "react-bootstrap";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import facade from "../facade";

export default function Login({ setLoggedIn }) {
  const { state } = useLocation();
  const pageAfterLogin = state ? state.from : "/exam/";
  const history = useHistory();
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [error, setError] = useState(null);

  const performLogin = (event) => {
    event.preventDefault();

    setError(null);

    if (loginCredentials.username !== "" && loginCredentials.password !== "") {
      facade
        .login(loginCredentials.username, loginCredentials.password)
        .then(() => {
          setLoggedIn(true);
          history.push(pageAfterLogin);
        })
        .catch((err) => {
          if (err.status) {
            err.fullError.then((e) => setError(e.message));
          }

          setError("En fejl opstod under behandlingen af din anmodning.");
        });
    } else {
      setError("Brugernavn og / eller adgangskode mangler!");
    }
  };

  const onChange = (event) => {
    setLoginCredentials({
      ...loginCredentials,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <>
      <h2>Bibliotekets læseklub - Log på</h2>
      <Form onChange={onChange}>
        <Form.Group>
          <Form.Label>Brugernavn</Form.Label>
          <Form.Control
            type="text"
            placeholder="Angiv brugernavn"
            id="username"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Adgangskode</Form.Label>
          <Form.Control
            type="password"
            placeholder="Angiv adgangskode"
            id="password"
          />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}

        <Button variant="primary" type="submit" onClick={performLogin}>
          Log på
        </Button>
      </Form>
    </>
  );
}
