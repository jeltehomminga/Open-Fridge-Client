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
      url: `http://localhost:5000/api/foodoffer`,
      config: { headers: { "Content-Type": "multipart/form-data" } }, //New! This is a different encoding type, because we're uploading files
      data: formData,
      withCredentials: true
    })
      .then(response => {
        debugger;
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

    const groceryImg = {};
    if (this.state.groceryOptions) {
      for (let grocery of this.state.groceryOptions) {
        groceryImg[grocery._id] = grocery.defaultImg;
      }
    }
    return (
      <form ref={this.form} onSubmit={this.handleSubmit}>
        <h2>What do you have to offer!?</h2>
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
        
        <div className="file">
          <label className="file-label" htmlFor="groceryitem-picture">
            <input className="file-input" type="file" name="groceryitem-picture" />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload" />
              </span>
              <span className="file-label">Choose a file…</span>
            </span>
          </label>
        </div>

        <button type="submit">Offer the food</button>
        {this.state.groceryOptions && (
          <img
            src={`http://localhost:5000/images/${
              this.state.img
                ? this.state.img
                : groceryImg[this.state.groceryItem]
            }`}
            alt="selectedgroceryitem"
          />
        )}
      </form>
    );
  }
}

export default OfferFood;
