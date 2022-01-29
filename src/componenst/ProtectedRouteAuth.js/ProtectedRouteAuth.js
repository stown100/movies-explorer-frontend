import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";


// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту

const ProtectedRouteAuth = ({ component: Component, ...rest }) => {
  const history = useHistory();
  return (
    <Route {...rest} render={props => !rest.loggedIn ? <Component {...props} {...rest} /> : history.push('/')} />
    // Почему-то в этом месте не работает <Redirect to='/' />
)}

export default ProtectedRouteAuth;