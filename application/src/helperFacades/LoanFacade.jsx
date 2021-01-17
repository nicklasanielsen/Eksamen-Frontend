import apiFacade from "./ApiFacade";

function LoanFacade() {
  const getLoan = (token) => {
    const request = apiFacade.prepareRequest("GET", null, token);

    return apiFacade.submitRequest("/loan/user/active", request);
  };

  const getAllLoans = (token) => {
    const request = apiFacade.prepareRequest("GET", null, token);

    return apiFacade.submitRequest("/loan/all", request);
  };

  const returnBook = (token, id) => {
    const request = apiFacade.prepareRequest("DELETE", null, token);

    return apiFacade.submitRequest("/loan/" + id, request);
  };

  const loanBook = (token, isbn) => {
    const request = apiFacade.prepareRequest("POST", null, token);

    return apiFacade.submitRequest("/loan/" + isbn, request);
  };

  return { getLoan, getAllLoans, returnBook, loanBook };
}

const loanFacade = LoanFacade();
export default loanFacade;
