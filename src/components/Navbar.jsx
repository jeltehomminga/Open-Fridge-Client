import React from "react";
import { Link, NavLink } from "react-router-dom";
import AuthService from "./auth/auth-service";
// import { createBrowserHistory } from 'history';
// const history = createBrowserHistory();

const Navbar = props => {
  const navStyle = {
    width: "100%"
  };
  const navListStyle = {
    listStyle: "none",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    color: "white"
  };
  const liStyle = {
    color: "black"
  };
  const service = new AuthService();
  const logout = () => {
    return service
      .logout()

      .then(responseData => {
        // response.data
        props.logOut({ loggedIn: false, user: {} });
        //TODO: How to redirect to home after logout? history not working
        props.history.push("/");
      });
  };
  const NavAuthenticated = props => (
  
      <ul style={navListStyle}>
        <li>
          <NavLink style={liStyle} to="/" activeClassName="selected">
            Home
          </NavLink>
        </li>
        <li>
          <Link style={liStyle} to="/about">
            About
          </Link>
        </li>
        <li>
          <Link style={liStyle} to="/profile">
            Profile
          </Link>
        </li>
        <li>
          <Link style={liStyle} to="/offerfood">
            Offer food
          </Link>
        </li>
        <li>
          <button onClick={() => logout()}>Logout</button>
        </li>
      </ul>

  );
  const NavUnauthenticated = props => (
       <ul style={navListStyle}>
        <li>
          <NavLink style={liStyle} to="/" activeClassName="selected">
            Home
          </NavLink>
        </li>
        <li>
          <Link style={liStyle} to="/about">
            About
          </Link>
        </li>
        <li>
          <Link style={liStyle} to="/signup">
            SignUp
          </Link>
        </li>
        <li>
          <Link style={liStyle} to="/login">
            SignIn
          </Link>
        </li>
      </ul>
  );
  return (    <nav style={navStyle}>
  {props.loggedIn?
    <NavAuthenticated {...props} />:
    <NavUnauthenticated {...props} />
  }
  </nav>

  );
};

export default Navbar;
