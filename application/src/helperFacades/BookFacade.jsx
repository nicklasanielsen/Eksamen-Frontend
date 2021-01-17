import apiFacade from "./ApiFacade";

function BookFacade() {
  const createBook = (
    isbn,
    title,
    authors,
    publisher,
    yearPublished,
    token
  ) => {
    const body = {
      isbn: isbn,
      title: title,
      authors: authors,
      publisher: publisher,
      yearPublished: yearPublished,
    };

    const request = apiFacade.prepareRequest("POST", body, token);

    return apiFacade.submitRequest("/book/create", request);
  };

  const getAllBooks = () => {
    const request = apiFacade.prepareRequest("GET");

    return apiFacade.submitRequest("/book/all", request);
  };

  const deleteBook = (token, isbn) => {
    const request = apiFacade.prepareRequest("DELETE", null, token);

    return apiFacade.submitRequest("/book/" + isbn, request);
  };

  const searchForBook = (searchCriteria) => {
    const request = apiFacade.prepareRequest("GET", null, null);

    return apiFacade.submitRequest("/book/" + searchCriteria, request);
  };

  return { createBook, getAllBooks, deleteBook, searchForBook };
}

const bookFacade = BookFacade();
export default bookFacade;
