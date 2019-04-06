import React, { Component } from "react";
import axios from "axios";
import moment from 'moment';

class FoodRequests extends Component {
  state = {
    foodRequests: []
  };
  componentDidMount() {
    axios({
      method: "get",
      withCredentials: "true",
      url: `${process.env.REACT_APP_API_URL}/foodrequests`
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
      url: `${process.env.REACT_APP_API_URL}/acceptrequest/${requestId}`
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
                          src={`${process.env.REACT_APP_URL}/images/${
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
                              src={`${process.env.REACT_APP_URL}/images/${foodRequest
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
                          <div>{foodRequest.description}</div>
                        
                        <div>Requested: { moment(foodRequest.createdAt).format('DD-MM-YY')}</div>
                      </div>
                    </div>
                    <footer className='card-footer'>
                      <p className='card-footer-item'>
                        <span
                          id={`modal-button-${index}`}
                          onClick={e => this.openModal(e, index)}
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
                        <p className='modal-card-title'>{`You will give ${
                          foodRequest.groceryItem.name
                        } to ${foodRequest.foodConsumer.firstName} `}</p>
                        <button
                          className='delete'
                          aria-label='close'
                          onClick={e => this.openModal(e, index)}
                        />
                      </header>
                      <section className='modal-card-body'>
                        <figure className='image is-squared'>
                          <img
                            src={`${process.env.REACT_APP_URL}/images/${
                              foodRequest.img
                                ? foodRequest.img
                                : foodRequest.groceryItem.defaultImg
                            }`}
                            alt='foodoffer'
                          style={{width: '200px', margin: 'auto'}}/>
                        </figure>

                        <div className='media'>
                          <div className='media-left'>
                            <figure className='image is-48x48'>
                              <img
                                src={`${process.env.REACT_APP_URL}/images/${foodRequest
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
                          onClick={e => this.acceptRequest(e, foodRequest._id)}
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
