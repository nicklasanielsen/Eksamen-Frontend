import { useEffect, useState } from "react";
import facade from "../facade";
import { Alert } from "react-bootstrap";

export default function Jokes() {
  const [getJokes, setJokes] = useState("Loading..");
  const [error, setError] = useState(null);

  useEffect(() => {
    facade
      .getJokes()
      .then((jokes) => {
        setJokes(
          jokes.map((joke) => {
            return (
              <li key={joke.joke + joke.ref}>
                {joke.joke} ({joke.ref})
              </li>
            );
          })
        );
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setError(e.message));
        }

        setError("An error occurred while processing your request.");
      });
  }, [setJokes]);

  return (
    <>
      <h2>Jokes</h2>
      {error ? (
        <>{error && <Alert variant="danger">{error}</Alert>}</>
      ) : (
        <>
          <ul>{getJokes}</ul>
        </>
      )}
    </>
  );
}
