import { useState, useEffect } from "react";
import { Row, Col, Alert, Button, Form } from "react-bootstrap";
import facade from "../facade";

export default function Books() {
  const [books, setBooks] = useState("Indlæser..");
  const [error, setError] = useState(null);
  const init = { searchCriteria: "" };
  const [searchCriteria, setSearchCriteria] = useState(init);

  const loanBook = (isbn) => {
    facade
      .loanBook(isbn)
      .then(() => {
        window.location.assign("./profile");
      })
      .catch(() => {
        window.location.assign("./membership/login");
      });
  };

  useEffect(() => {
    facade
      .getAllBooks()
      .then((data) => {
        setBooks(
          data.map((book) => {
            return (
              <Row key={book.isbn}>
                <Col md={3}>{book.title + " (" + book.isbn + ")"}</Col>
                <Col md={3}>{book.authors}</Col>
                <Col md={3}>{book.publisher}</Col>
                <Col md={2}>{book.yearPublished}</Col>
                <Col md={1}>
                  <Button
                    onClick={() => {
                      loanBook(book.isbn);
                    }}
                  >
                    Lån
                  </Button>
                </Col>
              </Row>
            );
          })
        );
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setError(e.message));
        }

        setError("Der opstod en fejl under indlæsning af bøgerne.");
      });
  }, []);

  const performSearch = (event) => {
    event.preventDefault();

    if (searchCriteria.searchCriteria !== "") {
      facade
        .searchForBook(searchCriteria.searchCriteria)
        .then((data) => {
          setBooks(
            data.map((book) => {
              return (
                <Row key={book.isbn}>
                  <Col md={3}>{book.title + " (" + book.isbn + ")"}</Col>
                  <Col md={3}>{book.authors}</Col>
                  <Col md={3}>{book.publisher}</Col>
                  <Col md={2}>{book.yearPublished}</Col>
                  <Col md={1}>
                    <Button
                      onClick={() => {
                        loanBook(book.isbn);
                      }}
                    >
                      Lån
                    </Button>
                  </Col>
                </Row>
              );
            })
          );
        })
        .catch((err) => {
          if (err.status) {
            err.fullError.then((e) => setError(e.message));
          }

          setError("Der opstod en fejl under indlæsning af bøgerne.");
        });
    }
  };

  const onChange = (event) => {
    setSearchCriteria({
      ...searchCriteria,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <>
      <h3>Bøger</h3>
      <Form onChange={onChange}>
        <Form.Group>
          <Form.Label>Søgeord</Form.Label>
          <Form.Control
            type="text"
            placeholder="Angiv søgeord"
            id="searchCriteria"
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={performSearch}>
          Søg
        </Button>
      </Form>

      <Row>
        <Col md={3}>Titel og IBSN</Col>
        <Col md={3}>Forfattere</Col>
        <Col md={3}>Forlag</Col>
        <Col md={2}>Udgivelsesår</Col>
        <Col md={1}>Lån</Col>
      </Row>
      {books}
      <Row>{error && <Alert variant="danger">{error}</Alert>}</Row>
    </>
  );
}
