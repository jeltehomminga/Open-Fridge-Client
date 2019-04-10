import React, { Component } from "react";
import AuthService from "./auth-service";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    error: ""
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
        debugger
        this.props.logIn({ loggedIn: true, user: responseData });
        this.props.history.push("/profile");
      })
      .catch(error => {
        debugger
        const newError = error.response ? error.response.data.message : ""
        this.setState({
          username: "",
          password: "",
          error: newError || "invalid credentials"
        });
        console.log(error);
      });
  };
  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        style={{ width: "50%", margin: "auto auto" }}
      >
        <h2>{this.state.error}</h2>

        <div className='field'>
          <div className='control has-icons-left has-icons-right'>
            <input
              className='input is-success'
              type='email'
              placeholder='Username'
              name='username'
              value={this.state.username}
              onChange={this.handleChange}
            />
            <span className='icon is-small is-left'>
              <i className='fas fa-user' />
            </span>
            <span className='icon is-small is-right'>
              <i className='fas fa-check' />
            </span>
          </div>
        </div>
        <div className='field'>
          <input
            className='input'
            type='password'
            name='password'
            minLength={8}
            value={this.state.password}
            onChange={this.handleChange}
            placeholder='Password:'
          />
        </div>
        <div className='field'>
          <div className='control'>
            <input className='button is-link' type='submit' value='Sign Up!' />
          </div>
        </div>
        <br />
      </form>
    );
  }
}

export default Signup;
