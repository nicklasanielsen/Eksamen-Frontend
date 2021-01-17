import { Col, Row, Button, Alert, Form } from "react-bootstrap";
import React, { useState } from "react";
import facade from "../facade";

export default function AdminToolBooks() {
  const init = {
    isbn: 0,
    title: "",
    authors: "",
    publisher: "",
    yearPublished: 0,
  };
  const [bookInfo, setBookInfo] = useState(init);
  const initFind = {
    isbn: 0,
  };
  const [bookInfoFind, setBookInfoFind] = useState(initFind);
  const [error, setError] = useState(null);
  const [errorFind, setErrorFind] = useState(null);

  const createBook = (event) => {
    event.preventDefault();

    setError(null);

    if (
      bookInfo.title !== "" &&
      bookInfo.authors !== "" &&
      bookInfo.publisher !== ""
    ) {
      facade
        .createBook(
          bookInfo.isbn,
          bookInfo.title,
          bookInfo.authors,
          bookInfo.publisher,
          bookInfo.yearPublished
        )
        .then(() => {
          setError("oprettet");
        })
        .catch((err) => {
          if (err.status) {
            err.fullError.then((e) => setError(e.message));
          }

          setError("En fejl opstod under behandlingen af din anmodning.");
        });
    } else {
      setError("Et eller flere felter mangler!");
    }
  };

  const deleteBook = (event) => {
    event.preventDefault();

    setErrorFind(null);

    facade
      .deleteBook(bookInfoFind.isbn)
      .then(() => {
        setErrorFind("Slettet");
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setErrorFind(e.message));
        }
        console.log(err);
        setErrorFind("En fejl opstod under behandlingen af din anmodning.");
      });
  };

  const editBook = (event) => {
    event.preventDefault();
  };

  const onChange = (event) => {
    setBookInfo({
      ...bookInfo,
      [event.target.id]: event.target.value,
    });
  };

  const onChangeFind = (event) => {
    setBookInfoFind({
      ...bookInfoFind,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <>
      <h2>Bog Administrering</h2>
      <Row>
        <Col md={5}>
          <h3>Opret en ny bog</h3>
          <Form onChange={onChange}>
            <Form.Group>
              <Form.Label>ISBN nummer</Form.Label>
              <Form.Control
                type="number"
                placeholder="Angiv ISBN nummer"
                id="isbn"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Titel</Form.Label>
              <Form.Control type="text" placeholder="Angiv titel" id="title" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Forfattere</Form.Label>
              <Form.Control
                type="text"
                placeholder="Angiv forfattere"
                id="authors"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Forlag</Form.Label>
              <Form.Control
                type="text"
                placeholder="Angiv forlag"
                id="publisher"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Udgivelsesår</Form.Label>
              <Form.Control
                type="number"
                placeholder="Angiv udgivelsesår"
                id="yearPublished"
              />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}

            <Button variant="primary" type="submit" onClick={createBook}>
              Opret bog
            </Button>
          </Form>
        </Col>
        <Col md={5}>
          <h3>Find eller slet bøger</h3>
          <Form onChange={onChangeFind}>
            <Form.Group>
              <Form.Label>ISBN nummer</Form.Label>
              <Form.Control
                type="number"
                placeholder="Angiv ISBN nummer"
                id="isbn"
              />
            </Form.Group>
            {errorFind && <Alert variant="danger">{errorFind}</Alert>}

            <Button variant="primary" type="submit" onClick={editBook} disabled>
              Rediger bog
            </Button>
            <Button variant="danger" type="submit" onClick={deleteBook}>
              Slet bog
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}
