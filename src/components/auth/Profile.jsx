import React, { Component } from "react";
import AuthService from "./auth-service";
import axios from "axios";
import "bulma/css/bulma.css";
import moment from "moment";

class Profile extends Component {
  form = React.createRef();
  state = {
    userType: "",
    ...this.props.user,
    foodRequests: [],
    foodOffers: []
  };
  service = new AuthService();
  componentDidMount = () => {
    axios({
      method: "get",
      withCredentials: "true",
      url: `${process.env.REACT_APP_API_URL}/foodrequests/`
    }).then(response => {
      const foodRequests = response.data.filter(
        foodRequest => foodRequest.foodConsumer._id === this.props.user._id
      );

      this.setState({ foodRequests });
    });
    axios({
      method: "get",
      withCredentials: "true",
      url: `${process.env.REACT_APP_API_URL}/foodoffers/`
    }).then(response => {
      const foodOffers = response.data.filter(
        foodOffer => foodOffer.foodSupplier._id === this.props.user._id
      );
      this.setState({ foodOffers });
    });
  };
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  picPreview = e => {
    const output = document.getElementById("output");
    output.src = URL.createObjectURL(e.target.files[0]);
  };
  handleSubmit = e => {
    e.preventDefault();
    let formData = new FormData(this.form.current);
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/user/${this.props.user._id}`,
      config: { headers: { "Content-Type": "multipart/form-data" } },
      data: formData,
      withCredentials: true
    })
      .then(response => {
        this.props.logIn({ loggedIn: true, user: response.data.response });
        if (response.data.response.foodSupplier) {
          this.props.history.push(`/offerfood/${this.props.user._id}`);
        } else {
          this.props.history.push(`/requestfood/${this.props.user._id}`);
        }
      })
      .catch(err => {
        this.setState({ err: err.message, success: "" });
      });
  };
  render() {
    const requestsOrOffersArray = this.props.user.foodConsumer
      ? this.state.foodRequests
      : this.state.foodOffers;
    return (
      <div className='columns' style={{ margin: "0" }}>
        <form
          ref={this.form}
          className='column is-one-third'
          style={{ padding: "5%", textAlign: "center" }}
          onSubmit={this.handleSubmit}
        >
          {this.state.img && (
            <div
              className='container'
              style={{ maxWidth: "100%", padding: "20px" }}
            >
              <figure
                className='image is-128x128'
                style={{ margin: "auto auto", overflow: "hidden" }}
              >
                <img
                  id='output'
                  src={`${process.env.REACT_APP_URL}/images/${this.state.img}`}
                  alt='profile pic'
                />
              </figure>
            </div>
          )}

          <h2>{this.state.error}</h2>
          <div className='field'>
            <label className='label'>Username</label>
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
            <label className='label'>First name</label>
            <div className='control'>
              <input
                className='input'
                type='text'
                name='firstName'
                value={this.state.firstName}
                onChange={this.handleChange}
                placeholder='First name'
              />
            </div>
          </div>

          <div className='field'>
            <label className='label'>Last name</label>
            <div className='control'>
              <input
                className='input'
                type='text'
                name='lastName'
                value={this.state.lastName}
                onChange={this.handleChange}
                placeholder='last name'
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Address</label>
            <input
              className='input'
              type='text'
              name='address'
              value={this.state.address}
              onChange={this.handleChange}
              placeholder='address'
            />
          </div>

          <div className='field'>
            <div
              className='file'
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label className='label' htmlFor='profile-picture'>
                Profile picture
              </label>
              <input
                className='file-input'
                type='file'
                name='profile-picture'
                id='profile-picture'
                onChange={this.picPreview}
              />
              <span className='file-cta'>
                <span className='file-icon'>
                  <i className='fas fa-upload' />
                </span>
                <span className='file-label'>Choose a file…</span>
              </span>
            </div>
          </div>

          <div className='field'>
            <div className='control'>
              <label className='radio'>
                <input
                  id='foodsupplier'
                  type='radio'
                  name='userType'
                  value='foodSupplier'
                  required
                  checked={
                    this.state.userType === "foodSupplier" ||
                    this.state.foodSupplier === true
                  }
                  onChange={this.handleChange}
                />
                Foodsupplier
              </label>
              <label className='radio'>
                <input
                  id='foodconsumer'
                  type='radio'
                  name='userType'
                  value='foodConsumer'
                  checked={
                    this.state.userType === "foodConsumer" ||
                    this.state.foodConsumer === true
                  }
                  onChange={this.handleChange}
                />
                Foodconsumer
              </label>
            </div>
          </div>

          <div className='field'>
            <div className='control'>
              <input className='button is-link' type='submit' value='Submit' />
            </div>
          </div>
        </form>

        <div
          className='column is-two-third is-8'
          style={{ padding: "5%", textAlign: "center" }}
        >
          <h1 className='is-size-2' style={{ width: "60%" }}>
            The food I {this.state.foodConsumer ? `requested` : `offered`}
          </h1>
          <br />
          <table className='table'>
            <thead>
              <tr>
                <th>Item</th>
                <th>Desciption</th>
                <th>Amount</th>
                <th>Food hero</th>
                <th>{this.state.foodConsumer ? `Offered` : `Accepted`}</th>
              </tr>
            </thead>
            <tbody>
              {this.state.foodRequests &&
                requestsOrOffersArray.length > 0 &&
                requestsOrOffersArray.map((foodRequest, index) => (
                  <tr key={`tr-${index}`}>
                    <td>{foodRequest.groceryItem.name}</td>
                    <td> {foodRequest.description}</td>
                    <td>{foodRequest.amount}</td>
                    {foodRequest.acceptedBy && (
                      <td>{foodRequest.acceptedBy.firstName}</td>
                    )}
                    {foodRequest.acceptedAt && (
                      <td>{moment(foodRequest.acceptedAt).toNow(true)} ago</td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Profile;
