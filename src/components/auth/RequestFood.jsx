import React, { Component } from "react";
import AuthService from "./auth-service";

class RequestFood extends Component {
  state = { form: { amount: "", description: "" } };
  service = new AuthService();
  handleChange = e => {
    this.setState(
      { form: { ...this.state.form, [e.target.name]: e.target.value } },
      () => console.log(this.state)
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
    debugger;
    this.service
      .foodRequest(this.state.form)
      .then(response => {
        this.setState({
          success: response.data.message,
          err: ""
        });
        this.props.history.push(`/foodrequests/${this.props.user._id}`);
      })
      .catch(err => {
        this.setState({ err: err.message });
      });
  };
  imageDivStyle = {
      width: '70%',
      margin: '0 auto'
  }
  imageStyle = {
      width: '30%'
  }
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
      debugger;
      for (let grocery of this.state.groceryOptions) {
        groceryImg[grocery._id] = grocery.defaultImg;
      }
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <h2>{this.state.err}</h2>
        <h2>Request Food you hungry human!</h2>
        <div>
          <label htmlFor="">Description:</label>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="groceryitem">Grocery item</label>
          <select name="groceryItem" onChange={this.handleChange}>
            {groceryOptionsMap}
          </select>
        </div>
        <div>
          <label htmlFor="">Amount</label>
          <input
            type="number"
            name="amount"
            onChange={this.handleChange}
            value={this.state.amount}
          />
        </div>
        <div style={this.imageDivStyle}>
          {this.state.groceryOptions && (
            <img style={this.imageStyle}
              src={`http://localhost:5000/images/${
                groceryImg[this.state.form.groceryItem]
              }`}
              alt="selectedgroceryitem"
            />
          )}
        </div>
        <button type="submit">Request the food</button>
      </form>
    );
  }
}

export default RequestFood;
