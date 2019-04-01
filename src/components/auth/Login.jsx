import React, { Component } from "react";
import AuthService from "./auth-service";

class Login extends Component {
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
      .login(this.state.username, this.state.password)
      .then(responseData => {
        this.setState({
          username: "",
          password: ""
        });
        this.props.logIn({ loggedIn: true, user: responseData });
        this.props.history.push("/profile");
      })
      .catch(error => {
        this.setState({
          username: "",
          password: "",
          error: error.response.data.message
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
            value={this.state.password}
            onChange={this.handleChange}
            placeholder='Password:'
          />
        </div>
        <div className='field'>
          <div className='control'>
            <input className='button is-link' type='submit' value='Sign in!' />
          </div>
        </div>
        <br />
      </form>
    );
  }
}

export default Login;
