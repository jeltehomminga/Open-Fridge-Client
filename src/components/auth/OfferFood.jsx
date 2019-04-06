import React, { Component } from "react";
import AuthService from "./auth-service";
import axios from "axios";

class OfferFood extends Component {
  form = React.createRef(); //Creating a ref (new!)
  state = {
    description: "",
    expiryDate: new Date().toLocaleDateString("fr-CA"),
    amount: ""
  };
  service = new AuthService();
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidMount = () => {
    this.service.groceryItems().then(responseData => {
      this.setState({
        groceryOptions: responseData,
        groceryItem: responseData[0]._id
      });
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    let formData = new FormData(this.form.current);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/foodoffer`,
      config: { headers: { "Content-Type": "multipart/form-data" } }, //New! This is a different encoding type, because we're uploading files
      data: formData,
      withCredentials: true
    })
      .then(response => {
         this.setState({
          success: response.data.message,
          img: response.data.img,
          err: ""
        });

        this.props.history.push(`/foodoffers/${this.props.user._id}`);
      })
      .catch(err => {
        this.setState({ err: err.message });
      });
  };
  imageDivStyle = {
    width: "70%",
    margin: "auto auto"
  };
  imageStyle = {
    width: "30%"
  };
  render() {
    const groceryOptionsMap =
      this.state.groceryOptions &&
      this.state.groceryOptions.map(groceryOption => {
        return (
          <option
            key={groceryOption._id}
            value={groceryOption._id}
            id={groceryOption._id}
          >
            {groceryOption.name}
          </option>
        );
      });

    const groceryImg = {};
    if (this.state.groceryOptions) {
      for (let grocery of this.state.groceryOptions) {
        groceryImg[grocery._id] = grocery.defaultImg;
      }
    }
    return (
      <div className='columns' style={{ margin: "0" }}>
        <form
          className='column is-one-third'
          style={{ padding: "5%", textAlign: "left" }}
          ref={this.form}
          onSubmit={this.handleSubmit}
        >
          <h1 className='is-size-4' >What do you have to offer!?</h1>
          <br/>

          <div className='field'>
            <label className='label'>Description:</label>
            <input
              className='input'
              type='text'
              name='description'
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>

          <div className='field'>
            <label className='label' htmlFor='groceryitem'>
              Grocery item
            </label>
            <div className='select'>
              <select name='groceryItem' onChange={this.handleChange}>
                {groceryOptionsMap}
              </select>
            </div>
          </div>

          <div className='field'>
            <label className='label'>Amount</label>
            <input
              className='input'
              type='number'
              name='amount'
              onChange={this.handleChange}
              value={this.state.amount}
            />
          </div>
          <div className='field'>
            <label className='label' htmlFor='expiryDate'>
              Expiry Date
            </label>
            <input
              className='input'
              type='date'
              name='expiryDate'
              required
              onChange={this.handleChange}
              value={this.state.expiryDate}
            />
          </div>

          <div className='field'>
            <div
              className='file'
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label className='label' htmlFor='groceryitem-picture'>
                Grocery image
              </label>
              <input
                className='file-input'
                type='file'
                name='groceryitem-picture'
                id='groceryitem-picture'
              />
              <span className='file-cta'>
                <span className='file-icon'>
                  <i className='fas fa-upload' />
                </span>
                <span className='file-label'>Choose a file…</span>
              </span>
            </div>
          </div>
          <br/>
          <div className='field'>
            <div className='control'>
              <input
                className='button is-link'
                type='submit'
                value='Offer The food'
              />
            </div>
          </div>
        </form>

        <div style={this.imageDivStyle} className='column is-one-third' >
          {this.state.groceryOptions && (
            <img
              style={this.imageStyle}
              src={`${process.env.REACT_APP_URL}/images/${
                this.state.img
                  ? this.state.img
                  : groceryImg[this.state.groceryItem]
              }`}
              alt='selectedgroceryitem'
            />
          )}
        </div>
      </div>
    );
  }
}

export default OfferFood;
