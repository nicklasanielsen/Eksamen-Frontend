import React, { useState, useEffect, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Books from "./components/Books";
import Header from "./components/Header";
import NoRoute from "./components/NoRoute";
import { Container } from "react-bootstrap";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminToolBooks from "./components/AdminToolBooks";
import facade from "./facade";
import AdminToolLoan from "./components/AdminToolLoan";
import AdminToolResevation from "./components/AdminToolResevation";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(facade.isLoggedIn());

  const tokenValidationCheck = useCallback(() => {
    if (isLoggedIn) {
      let currentStatus = facade.isLoggedIn();

      if (!currentStatus) {
        setLoggedIn(false);
        facade.logout();
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const interval = setInterval(() => {
      tokenValidationCheck();
    }, 1000); /* Every Second */
    return () => clearInterval(interval);
  }, [tokenValidationCheck]);

  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        setLoggedIn={setLoggedIn}
        isAdmin={facade.isAdmin()}
      />

      <Container className="mt-5">
        <Switch>
          <Route exact path="/exam/">
            <Home />
          </Route>
          <Route exact path="/exam/books">
            <Books />
          </Route>
          <PrivateRoute
            path="/exam/admin/book"
            isLoggedIn={isLoggedIn}
            component={AdminToolBooks}
          />
          <PrivateRoute
            path="/exam/admin/loan"
            isLoggedIn={isLoggedIn}
            component={AdminToolLoan}
          />
          <PrivateRoute
            path="/exam/profile"
            isLoggedIn={isLoggedIn}
            component={Profile}
          />
          <PrivateRoute
            path="/exam/admin/resevation"
            isLoggedIn={isLoggedIn}
            component={AdminToolResevation}
          />
          <Route path="/exam/membership/login">
            <Login setLoggedIn={setLoggedIn} />
          </Route>
          <Route path="/exam/membership/register">
            <Register setLoggedIn={setLoggedIn} />
          </Route>
          <Route>
            <NoRoute />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
