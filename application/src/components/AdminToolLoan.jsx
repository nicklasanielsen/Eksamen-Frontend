import { Alert, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import facade from "../facade";

export default function AdminToolLoan() {
  const [loans, setLoans] = useState("Indlæser..");
  const [error, setError] = useState(null);

  useEffect(() => {
    facade
      .getAllLoans()
      .then((data) => {
        setLoans(
          data.map((loan) => {
            return (
              <Row key={loan.id}>
                <Col md={4}>
                  {loan.bookDTO.title + " (" + loan.bookDTO.isbn + ")"}
                </Col>
                <Col md={3}>{loan.userDTO.fullName}</Col>
                <Col md={3}>{loan.dueDate}</Col>
                <Col md={2}>{loan.returned ? "Ja" : "Nej"}</Col>
              </Row>
            );
          })
        );
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setError(e.message));
        }

        setError(
          "Der opstod en fejl under indlæsning af listen over lånte bøger."
        );
      });
  }, []);

  return (
    <>
      <Row>
        <Col md={4}>Titel og IBSN</Col>
        <Col md={3}>Låner</Col>
        <Col md={3}>Afleveringsfrist</Col>
        <Col md={2}>Afleveret</Col>
      </Row>
      {loans}
      <Row>{error && <Alert variant="danger">{error}</Alert>}</Row>
    </>
  );
}
