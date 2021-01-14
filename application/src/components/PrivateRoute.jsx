import { Redirect, Route, useLocation } from "react-router-dom";

export default function PrivateRoute({
  component: Component,
  isLoggedIn,
  ...rest
}) {
  const { pathname } = useLocation();

  return (
    <Route {...rest}>
      {isLoggedIn ? (
        <Component />
      ) : (
        <Redirect
          to={{ pathname: "/exam/fanclub/login", state: { from: pathname } }}
        />
      )}
    </Route>
  );
}
