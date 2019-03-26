import React, { Component } from "react";
import AuthService from "./auth-service";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    error: "",
  };
  service = new AuthService();
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  handleSubmit = e => {
    e.preventDefault();
    this.service
      .signup(this.state.username, this.state.password)
      .then(responseData => {
        this.setState({
          username: "",
          password: ""
        });
        this.props.logIn({loggedIn: true, user: responseData})
        this.props.history.push('/profile');
      })
      .catch(error => {
          this.setState({
            username: "",
            password: "",
            error: error.response.data.message
          });
          console.log(error)
        });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <h2>{this.state.error}</h2>
          <input
            type="email"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        {/* </label> */}
      </form>
    );
  }
}

export default Signup;
