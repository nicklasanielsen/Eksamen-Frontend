import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import facade from "../facade";

export default function Profile() {
  const [getLoan, setLoan] = useState("Loading..");
  const [errorLoan, setErrorLoan] = useState(null);

  const returnBook = (id) => {
    facade.returnBook(id).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    facade
      .getLoan()
      .then((data) => {
        setLoan(
          data.map((loan) => {
            return (
              <Row key={loan.id}>
                <Col md={3}>
                  {loan.bookDTO.title + " (" + loan.bookDTO.isbn + ")"}
                </Col>
                <Col md={3}>{loan.bookDTO.authors}</Col>
                <Col md={2}>{loan.bookDTO.publisher}</Col>
                <Col md={3}>{loan.dueDate}</Col>
                <Col md={1}>
                  <Button onClick={() => returnBook(loan.id)}>Aflever</Button>
                </Col>
              </Row>
            );
          })
        );
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setErrorLoan(e.message));
        }

        setErrorLoan(
          "Der opstod en fejl under indlæsning af listen over dine lånte elementer."
        );
      });
  }, []);

  return (
    <>
      <h2>Min profil</h2>
      <Row>
        <Col>
          <h3>Låneoversigt</h3>
          <Row>
            <Col md={3}>Titel og IBSN</Col>
            <Col md={3}>Forfattere</Col>
            <Col md={2}>Forlag</Col>
            <Col md={3}>Afleveringsfrist</Col>
            <Col md={1}>Aflever</Col>
          </Row>
          {errorLoan ? (
            <>{errorLoan && <Alert variant="danger">{errorLoan}</Alert>}</>
          ) : (
            <>{getLoan}</>
          )}
        </Col>
      </Row>
    </>
  );
}
