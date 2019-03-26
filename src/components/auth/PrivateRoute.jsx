import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, user, loggedIn, logIn, ...rest }) => {
  return (
    <Route {...rest} render={props => {
        if (loggedIn) {
           return  <Component {...props} user={user} loggedIn={loggedIn} logIn={logIn}/>
        } else {
           return <Redirect to="/login" />
        }
      }}
    />
  );
};


export default PrivateRoute;
