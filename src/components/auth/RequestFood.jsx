import React, { Component } from "react";
import AuthService from "./auth-service";

class RequestFood extends Component {
  state = { form: { amount: "", description: "" } };
  service = new AuthService();
  handleChange = e => {
    this.setState(
      { form: { ...this.state.form, [e.target.name]: e.target.value } },
    );
  };
  componentDidMount = () => {
    this.service.groceryItems().then(responseData => {
      this.setState({
        groceryOptions: responseData,
        form: { ...this.state.form, groceryItem: responseData[0]._id }
      });
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.service
      .foodRequest(this.state.form)
      .then(response => {
        this.setState({
          err: ""
        });
        this.props.history.push(`/foodrequests/${this.props.user._id}`);
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
          onSubmit={this.handleSubmit}
        >
          <h2>{this.state.err}</h2>
          <h1 className='is-size-4' >Request Food you hungry human!</h1>
          <br />

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
          <br/>
          <div className='field'>
            <div className='control'>
              <input
                className='button is-link'
                type='submit'
                value='Request the food'
              />
            </div>
          </div>
        </form>

        <div style={this.imageDivStyle}  className='column is-one-third'>
          {this.state.groceryOptions && (
            <img
              style={this.imageStyle}
              src={`${process.env.REACT_APP_URL}/images/${
                groceryImg[this.state.form.groceryItem]
              }`}
              alt='selectedgroceryitem'
            />
          )}
        </div>
      </div>
    );
  }
}

export default RequestFood;
