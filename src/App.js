import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Profile from "./components/auth/Profile";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import AuthService from "./components/auth/auth-service";
import { createBrowserHistory } from "history";
import OfferFood from './components/auth/OfferFood';
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
    // history.push('/');
    //TOFO: How to redirect to home!? history or redirect not working
    // return <Redirect to ='/' />;
  };
  componentWillMount() {
    this.setState(JSON.parse(localStorage.getItem("state")));
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header"> */}
        <Navbar
          {...this.props}
          loggedIn={this.state.loggedIn}
          user={this.state.user}
          logOut={this.logOut}
          history={history}
        />

        <Switch>
          <Route path="/signup" render={(props)=> <Signup {...props} loggedIn={this.loggedIn}/>} /> */}

          <Route exact path="/" render={(props)=> <Home {...props} loggedIn={this.state.loggedIn}/>}  />
          
          <Route
            path="/signup"
            render={props => <Signup {...props} logIn={this.logIn} />}
          />
          <Route
            path="/login"
            render={props => <Login {...props} logIn={this.logIn} />}
          />
          <PrivateRoute
            path="/profile"
            user={this.state.user}
            component={Profile}
            loggedIn={this.state.loggedIn}
            logIn={this.logIn}
          />
          <PrivateRoute
            path="/offerfood"
            user={this.state.user}
            component={OfferFood}
            loggedIn={this.state.loggedIn}
            logIn={this.logIn}
          />
        </Switch>

        {/* </header> */}
      </div>
    );
  }
}

export default App;
