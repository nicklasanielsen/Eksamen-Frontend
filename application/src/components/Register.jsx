import { Form, Button, Alert, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import facade from "../facade";

export default function Register({ setLoggedIn }) {
  const history = useHistory();
  const init = {
    username: "",
    password: "",
    verifyPassword: "",
    firstname: "",
    lastname: "",
  };
  const [userCredentials, setUserCredentials] = useState(init);
  const [error, setError] = useState(null);

  const performRegistration = (event) => {
    event.preventDefault();

    setError(null);

    if (
      userCredentials.username !== "" &&
      userCredentials.password !== "" &&
      userCredentials.verifyPassword !== "" &&
      userCredentials.firstname !== "" &&
      userCredentials.lastname !== ""
    ) {
      if (userCredentials.password !== userCredentials.verifyPassword) {
        setError("Adgangskoderne er ikke de samme.");
        return;
      }

      facade
        .register(
          userCredentials.username,
          userCredentials.password,
          userCredentials.firstname,
          userCredentials.lastname
        )
        .then(() => {
          setLoggedIn(true);
          history.push("/exam/");
        })
        .catch((err) => {
          if (err.status) {
            err.fullError.then((e) => setError(e.message));
          }

          setError("En fejl opstod under behandlingen af din anmodning.");
        });
    } else {
      setError(
        "Alle felter er obligatoriske. Kontroller, at du har angivet alle de ønskede oplysninger."
      );
    }
  };

  const onChange = (event) => {
    setUserCredentials({
      ...userCredentials,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <>
      <h2>Bibliotekets læseklub - Opret konto</h2>
      <Form onChange={onChange}>
        <Form.Group>
          <Form.Label>Fornavn</Form.Label>
          <Form.Control
            type="text"
            placeholder="Angiv dit fornavn"
            id="firstname"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Efternavn</Form.Label>
          <Form.Control
            type="text"
            placeholder="Angiv dit efternavn"
            id="lastname"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Brugernavn</Form.Label>
          <Form.Control
            type="text"
            placeholder="Angiv dit brugernavn"
            id="username"
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Adgangskode</Form.Label>
              <Form.Control
                type="password"
                placeholder="Angiv din adgangskode"
                id="password"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Bekræft adgangskode</Form.Label>
              <Form.Control
                type="password"
                placeholder="Bekræft din adgangskode"
                id="verifyPassword"
              />
            </Form.Group>
          </Col>
        </Row>

        {error && <Alert variant="danger">{error}</Alert>}

        <Button variant="primary" type="submit" onClick={performRegistration}>
          Opret konto
        </Button>
      </Form>
    </>
  );
}
