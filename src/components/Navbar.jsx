import React from "react";
import { Link, NavLink } from "react-router-dom";
import AuthService from "./auth/auth-service";

const Navbar = props => {
  const service = new AuthService();
  const hamburgerIcon = React.createRef();
  const hamburgerMenu = React.createRef();
  const logout = () => {
    return service
      .logout()

      .then(responseData => {
        props.logOut({ loggedIn: false, user: {} });
        props.history.push("/");
      });
  };

  const toggleHamburger = () => {
    hamburgerIcon.current.classList.toggle("is-active");
    hamburgerMenu.current.classList.toggle("is-active");
  };

  const NavAuthenticated = props => {
    return (
      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='navbar-brand'>
          <Link className='navbar-item' to='/about'>
            <h1 style={{ fontFamily: "Orbitron, sans-serif" }}>Open Fridge</h1>
          </Link>
          <div
            ref={hamburgerIcon}
            id='hamburgericon'
            role='button'
            className='navbar-burger burger'
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarBasicExample'
            onClick={toggleHamburger}
          >
            <span aria-hidden='true' />
            <span aria-hidden='true' />
            <span aria-hidden='true' />
          </div>
        </div>
        <div
          ref={hamburgerMenu}
          id='navbarBasicExample'
          className='navbar-menu'
        >
          <div className='navbar-start'>
            <NavLink className='navbar-item' to='/' activeClassName='selected'>
              Home
            </NavLink>
            <Link className='navbar-item' to='/profile'>
              Profile
            </Link>
            {props.user.foodConsumer ? (
              <>
                <Link className='navbar-item' to='/foodoffers'>
                  Food offers
                </Link>
                <Link className='navbar-item' to='/requestfood'>
                  Request food
                </Link>
              </>
            ) : (
              <>
                <Link className='navbar-item' to='/foodrequests'>
                  Food requests
                </Link>
                <Link className='navbar-item' to='/offerfood'>
                  Offer food
                </Link>
              </>
            )}
          </div>

          <div className='navbar-end'>
            <div className='navbar-item'>
              <div className='buttons'>
                <div onClick={() => logout()} className='button is-light'>
                  Log out
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  };

  const NavUnauthenticated = props => (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <Link className='navbar-item' to='/about'>
          <h1 style={{ fontFamily: "Orbitron, sans-serif" }}>Open Fridge</h1>
        </Link>
        <div
          ref={hamburgerIcon}
          id='hamburgericon'
          role='button'
          className='navbar-burger burger'
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarBasicExample'
          onClick={toggleHamburger}
        >
          <span aria-hidden='true' />
          <span aria-hidden='true' />
          <span aria-hidden='true' />
        </div>
      </div>
      <div ref={hamburgerMenu} id='navbarBasicExample' className='navbar-menu'>
        <div className='navbar-start'>
          <NavLink className='navbar-item' to='/' activeClassName='selected'>
            Home
          </NavLink>
        </div>

        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              <Link className='button is-primary' to='/signup'>
                SignUp
              </Link>
              <Link className='button is-light' to='/login'>
                SignIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <div>
      {props.loggedIn ? (
        <NavAuthenticated {...props} />
      ) : (
        <NavUnauthenticated {...props} />
      )}
    </div>
  );
};

export default Navbar;
