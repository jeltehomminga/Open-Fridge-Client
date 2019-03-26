import React, { Component } from "react";
import AuthService from "./auth-service";
import axios from "axios";

class Profile extends Component {
  form = React.createRef(); //Creating a ref (new!)
  state = { userType: "", ...this.props.user };
  service = new AuthService();
  componentDidMount = () => {};

  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  handleSubmit = e => {
    e.preventDefault();
    let formData = new FormData(this.form.current);
    axios({
      method: "put",
      url: `http://localhost:5000/api/user/${this.props.user._id}`,
      config: { headers: { "Content-Type": "multipart/form-data" } }, //New! This is a different encoding type, because we're uploading files
      data: formData,
      withCredentials: true
    })
      .then(response => {
        this.setState(
          { success: response.data.message, err: "", ...response.data.response } ,  
                  () => this.props.logIn({ loggedIn: true, user: response.data.response  })
        );
        this.state.foodSupplier
          ? this.props.history.push(`/offerfood/${this.props.user._id}`)
          : this.props.history.push("/about");
      })
      .catch(err => {
        this.setState({ err: err.message });
      });
  };
  render() {
    const profileImageDiv = {
      width: "300px",
      height: "300px"
    };
    const profileImage = {
      width: "100%"
    };
    const formStyle = {
      display: "flex",
      flexDirection: "column",
      width: "30%",
      margin: "0 auto"
    };
    return (
      <form ref={this.form} style={formStyle} onSubmit={this.handleSubmit}>
        <h2>{this.state.error}</h2>
        <h3>Profile</h3>
        {this.state.img &&
                <div style={profileImageDiv}>
                <img
                  style={profileImage}
                  src={`http://localhost:5000/images/${this.state.img}`}
                  alt="profile pic"
                />
              </div>        
        }

        <input
          type="email"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="firstName"
          value={this.state.firstName}
          onChange={this.handleChange}
          placeholder="first name"
        />
        <input
          type="text"
          name="lastName"
          value={this.state.lastName}
          onChange={this.handleChange}
          placeholder="last name"
        />{" "}
        <input
          type="text"
          name="address"
          value={this.state.address}
          onChange={this.handleChange}
          placeholder="address"
        />
        <input className="file-input" type="file" name="profile-picture" />
        <label htmlFor="foodsupplier">
          <input
            id="foodsupplier"
            type="radio"
            name="userType"
            value="foodSupplier"
            required
            checked={this.state.userType === "foodSupplier" || this.state.foodSupplier === true }
            onChange={this.handleChange}
          />
          Foodsupplier
        </label>
        <label htmlFor="foodconsumer">
          <input
            id="foodconsumer"
            type="radio"
            name="userType"
            value="foodConsumer"
            checked={this.state.userType === "foodConsumer" || this.state.foodConsumer === true}
            onChange={this.handleChange}
          />
          Foodconsumer
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Profile;
