import React, { Component } from "react";
import axios from "axios";

class FoodRequests extends Component {
  state = {
    foodRequests: []
  };
  componentDidMount() {
    axios({
      method: "get",
      withCredentials: "true",
      url: `http://localhost:5000/api/foodrequests`
    }).then(response => {
      this.setState({ foodRequests: response.data });
    });
  }
  openModal = (e, index) => {
    let modal = document.getElementById(`modal-card-${index}`);
    modal.classList.toggle("is-active");
  };
  acceptRequest = (e, requestId) => {

    axios({
      method: "post",
      withCredentials: "true",
      url: `http://localhost:5000/api/acceptrequest/${requestId}`
    }).then(response => {
      this.props.history.push("/profile");
    });
  };
  render() {
    const equalHeight = {
      height: "100%"
    };

    return (
      <div>
        <section className='section cards'>
          <div className='columns is-multiline'>
            {this.state.foodRequests &&
              this.state.foodRequests.map((foodRequest, index) => (
                <div className='column is-one-quarter' key={foodRequest._id}>
                  <div className='card' style={equalHeight}>
                    <div
                      className='card-image'
                      style={{ width: "80%", margin: "25px", padding: "25px" }}
                    >
                      <figure className='image is-square'>
                        <img
                          src={`http://localhost:5000/images/${
                            foodRequest.img
                              ? foodRequest.img
                              : foodRequest.groceryItem.defaultImg
                          }`}
                          alt='foodRequest'
                        />
                      </figure>
                    </div>
                    <div className='card-content'>
                      <div className='media'>
                        <div className='media-left'>
                          <figure className='image is-48x48'>
                            <img
                              src={`http://localhost:5000/images/${foodRequest
                                .foodConsumer.img &&
                                foodRequest.foodConsumer.img}`}
                              alt='foodsupplier'
                            />
                          </figure>
                        </div>
                        <div className='media-content has-text-black-ter'>
                          <p className='title is-4 has-text-black-ter '>
                            {foodRequest.foodConsumer.firstName}
                          </p>
                          <p className='subtitle is-6 has-text-black-ter'>
                            {foodRequest.foodConsumer.lastName}
                          </p>
                        </div>
                      </div>

                      <div className='content'>
                        {foodRequest.description}
                        <time dateTime='2016-1-1'>11:09 PM - 1 Jan 2016</time>
                      </div>
                    </div>
                    <footer className='card-footer'>
                      <p className='card-footer-item'>
                        <span
                          id={`modal-button-${index}`}
                          onClick={e => this.openModal(e, index)}
                          //  onClick={e =>
                          //       this.acceptRequest(e, foodRequest._id)}
                        >
                          Yes, I have it for you!
                        </span>
                      </p>
                    </footer>
                  </div>

                  {/* now the modal card */}

                  <div className='modal' id={`modal-card-${index}`}>
                    <div className='modal-background' />
                    <div className='modal-card'>
                      <header className='modal-card-head'>
                        <p className='modal-card-title'>{`You will get ${
                          foodRequest.groceryItem.name
                        } from ${foodRequest.foodConsumer.firstName} `}</p>
                        <button
                          className='delete'
                          aria-label='close'
                          onClick={e => this.openModal(e, index)}
                        />
                      </header>
                      <section className='modal-card-body'>
                        <figure className='image is-4by3'>
                          <img
                            src={`http://localhost:5000/images/${
                              foodRequest.img
                                ? foodRequest.img
                                : foodRequest.groceryItem.defaultImg
                            }`}
                            alt='foodoffer'
                          />
                        </figure>

                        <div className='media'>
                          <div className='media-left'>
                            <figure className='image is-48x48'>
                              <img
                                src={`http://localhost:5000/images/${foodRequest
                                  .foodConsumer.img &&
                                  foodRequest.foodConsumer.img}`}
                                alt='foodsupplier'
                              />
                            </figure>
                          </div>
                          <div className='media-content has-text-black-ter'>
                            <p className='title is-4 has-text-black-ter'>
                              {foodRequest.foodConsumer.firstName}
                            </p>
                            <p className='subtitle is-6 has-text-black-ter'>
                              {foodRequest.foodConsumer.lasttName}
                            </p>
                          </div>
                        </div>
                      </section>
                      <footer className='modal-card-foot'>
                        <button
                          className='button is-success'
                          onClick={e => this.acceptOffer(e, foodRequest._id)}
                        >
                          Cool!
                        </button>
                        <button
                          className='button'
                          id={`modal-close-${index}`}
                          onClick={e => this.openModal(e, index)}
                        >
                          Naaaaaaaah...
                        </button>
                      </footer>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    );
  }
}

export default FoodRequests;
