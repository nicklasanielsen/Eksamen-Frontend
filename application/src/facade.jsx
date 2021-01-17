import authFacade from "./helperFacades/AuthFacade";
import tokenFacade from "./helperFacades/TokenFacade";
import bookFacade from "./helperFacades/BookFacade";
import loanFacade from "./helperFacades/LoanFacade";

function Facade() {
  /** Auth related */
  const login = (username, password) => {
    return authFacade.login(username, password);
  };

  const logout = () => {
    authFacade.logout();
  };

  const isLoggedIn = () => {
    return authFacade.isLoggedIn();
  };

  const register = (username, password, firstname, lastname) => {
    return authFacade.register(username, password, firstname, lastname);
  };

  const isAdmin = () => {
    return authFacade.isAdmin();
  };

  /** Book related */
  const getAllBooks = () => {
    return bookFacade.getAllBooks();
  };

  const searchForBook = (searchCriteria) => {
    return bookFacade.searchForBook(searchCriteria);
  };

  /** Admin related */
  const createBook = (isbn, title, authors, publisher, yearPublished) => {
    let token = tokenFacade.getToken();

    return bookFacade.createBook(
      isbn,
      title,
      authors,
      publisher,
      yearPublished,
      token
    );
  };

  const deleteBook = (isbn) => {
    let token = tokenFacade.getToken();

    return bookFacade.deleteBook(token, isbn);
  };

  /** Loan related */
  const getAllLoans = () => {
    let token = tokenFacade.getToken();

    return loanFacade.getAllLoans(token);
  };

  const returnBook = (id) => {
    let token = tokenFacade.getToken();

    return loanFacade.returnBook(token, id);
  };

  const loanBook = (isbn) => {
    let token = tokenFacade.getToken();

    return loanFacade.loanBook(token, isbn);
  };

  return {
    /** Auth related */
    login,
    logout,
    isLoggedIn,
    register,
    isAdmin,

    /** Admin related */
    createBook,
    deleteBook,

    /** Book related */
    getAllBooks,
    searchForBook,

    /** Loan related */
    getAllLoans,
    returnBook,
    loanBook,
  };
}

const facade = Facade();
export default facade;
