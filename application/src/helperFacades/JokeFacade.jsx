import apiFacade from "./ApiFacade";

function JokeFacade() {
  const getRandomJokes = (token) => {
    const request = apiFacade.prepareRequest("GET", null, token);

    return apiFacade.submitRequest("/fun/jokes", request);
  };

  return { getRandomJokes };
}

const jokeFacade = JokeFacade();
export default jokeFacade;
