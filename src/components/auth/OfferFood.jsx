import React, { Component } from "react";
import AuthService from "./auth-service";
import axios from "axios";

class OfferFood extends Component {
  form = React.createRef(); //Creating a ref (new!)
  state = { description: "", expiryDate: new Date().toLocaleDateString('fr-CA') , amount: "" };
  service = new AuthService();
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidMount = () => {
     this.service.groceryItems().then(responseData => {
      this.setState({ groceryOptions: responseData });
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    let formData = new FormData(this.form.current);
    console.log(formData);
    axios({
      method: "post",
      url: `http://localhost:5000/api/foodoffer/${this.props.user._id}`,
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
    return (
      <form ref={this.form} onSubmit={this.handleSubmit}>
        <h2>What do you have to offer!?</h2>
        <div>
          <label htmlFor="">Description:</label>
          <input
            type="text"
            name="description"
            id=""
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
        <div>
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            required
            onChange={this.handleChange}
            value={this.state.expiryDate}
          />
        </div>
        <input className="file-input" type="file" name="groceryitem-picture" />
        <button type="submit">Offer the food</button>
      </form>
    );
  }
}

export default OfferFood;
