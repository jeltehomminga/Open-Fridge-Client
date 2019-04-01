import React from "react";
import { Link, NavLink } from "react-router-dom";
import AuthService from "./auth/auth-service";

const Navbar = props => {
  const service = new AuthService();
  const logout = () => {
    return service
      .logout()

      .then(responseData => {
        props.logOut({ loggedIn: false, user: {} });
        //TODO: How to redirect to home after logout? history not working
        props.history.push("/");
      });
  };

  const NavAuthenticated = props => {
    return (
      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='navbar-brand'>
          <a className='navbar-item' href='/about'>
            <h1 style={{ fontFamily: "Orbitron, sans-serif" }}>Open Fridge</h1>
          </a>
          <div
            role='button'
            className='navbar-burger burger'
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarBasicExample'
          >
            <span aria-hidden='true' />
            <span aria-hidden='true' />
            <span aria-hidden='true' />
          </div>
        </div>
        <div id='navbarBasicExample' className='navbar-menu'>
          <div className='navbar-start'>
            <NavLink className='navbar-item' to='/' activeClassName='selected'>
              Home
            </NavLink>
            <Link className='navbar-item' to='/profile'>
              Profile
            </Link>       
            {props.user.foodConsumer ? <>
        <Link className='navbar-item' to='/foodoffers'>
          Food offers
        </Link>
        <Link className='navbar-item' to='/requestfood'>
          Request food
        </Link></> : <>
                  <Link className='navbar-item' to='/foodrequests'>
                  Food requests
                </Link>
                          <Link className='navbar-item' to='/offerfood'>
                          Offer food
                        </Link></>

      }

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
        <a className='navbar-item' href='/about'>
          <h1 style={{ fontFamily: "Orbitron, sans-serif" }}>Open Fridge</h1>
        </a>
        <div
          role='button'
          className='navbar-burger burger'
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarBasicExample'
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </div>
      </div>
      <div id='navbarBasicExample' className='navbar-menu'>
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
  document.addEventListener("DOMContentLoaded", () => {
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );
    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach(el => {
        el.addEventListener("click", () => {
          const target = el.dataset.target;
          const $target = document.getElementById(target);
          el.classList.toggle("is-active");
          $target.classList.toggle("is-active");
        });
      });
    }
  });

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
