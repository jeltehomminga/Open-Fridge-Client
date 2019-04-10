import React, { Component } from "react";
import "./App.css";
import "bulma/css/bulma.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Profile from "./components/auth/Profile";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import AuthService from "./components/auth/auth-service";
import { createBrowserHistory } from "history";
import OfferFood from "./components/auth/OfferFood";
import RequestFood from "./components/auth/RequestFood";
import FoodOffers from "./components/auth/FoodOffers";
import FoodRequests from "./components/auth/FoodRequests";
import About from "./components/About";

const history = createBrowserHistory();

class App extends Component {
  state = {
    loggedIn: false,
    user: {}
  };

  service = new AuthService();
  logIn = loginState => {
    const { user, loggedIn } = loginState;
    this.setState({ loggedIn, user });
    localStorage.setItem("state", JSON.stringify(loginState));
  };
  logOut = logoutState => {
    const { user, loggedIn } = logoutState;
    this.setState({ loggedIn, user });
    localStorage.setItem("state", JSON.stringify(logoutState));
  };
  componentWillMount() {
    this.setState(JSON.parse(localStorage.getItem("state")));
  }

  render() {
    return (
      <div className='App'>
        <section className='hero is-primary is-medium is-bold is-fullheight'>
          <div className='hero-head'>
            <Navbar
              {...this.props}
              loggedIn={this.state.loggedIn}
              user={this.state.user}
              logOut={this.logOut}
              history={history}
            />
          </div>

          <div className='hero-body is-bold is-paddingless is-fullheight'>
            <div className='container has-text-centered'>
              <Switch>
                <Route
                  exact
                  path='/'
                  render={props => (
                    <Home {...props} loggedIn={this.state.loggedIn} logIn={this.logIn} />
                  )}
                />
                <Route
                  exact
                  path='/about'
                  render={props => (
                    <About
                      {...props}
                      loggedIn={this.state.loggedIn}
                      user={this.state.user}
                    />
                  )}
                />
                <Route
                  path='/signup'
                  render={props => <Signup {...props} logIn={this.logIn} />}
                />
                <Route
                  path='/login'
                  render={props => <Login {...props} logIn={this.logIn} />}
                />
                <PrivateRoute
                  path='/profile'
                  user={this.state.user}
                  component={Profile}
                  loggedIn={this.state.loggedIn}
                  logIn={this.logIn}
                />
                <PrivateRoute
                  path='/offerfood'
                  user={this.state.user}
                  component={OfferFood}
                  loggedIn={this.state.loggedIn}
                  logIn={this.logIn}
                />
                <PrivateRoute
                  path='/requestfood'
                  user={this.state.user}
                  component={RequestFood}
                  loggedIn={this.state.loggedIn}
                  logIn={this.logIn}
                />
                <PrivateRoute
                  path='/foodoffers'
                  user={this.state.user}
                  component={FoodOffers}
                  loggedIn={this.state.loggedIn}
                  logIn={this.logIn}
                />
                <PrivateRoute
                  path='/foodrequests'
                  user={this.state.user}
                  component={FoodRequests}
                  loggedIn={this.state.loggedIn}
                  logIn={this.logIn}
                />
              </Switch>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
