import React, { Component } from "react";
import axios from "axios";
import moment from 'moment';

class FoodOffers extends Component {
  state = {
    foodOffers: []
  };
  componentDidMount() {
    axios({
      method: "get",
      withCredentials: "true",
      url: `${process.env.REACT_APP_API_URL}/foodoffers`
    }).then(response => {
      this.setState({ foodOffers: response.data });
    });
  }
  openModal = (e, index) => {
    let modal = document.getElementById(`modal-card-${index}`);
    modal.classList.toggle("is-active");
  };
  acceptOffer = (e, offerId) => {
    axios({
      method: "post",
      withCredentials: "true",
      url: `${process.env.REACT_APP_API_URL}/acceptoffer/${offerId}`
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
            {this.state.foodOffers &&
              this.state.foodOffers.map((foodOffer, index) => (
                <div className='column is-one-quarter' key={foodOffer._id}>
                  <div
                    className='card has-background-light'
                    style={equalHeight}
                  >
                    <div className='card-image' style={{width: '80%', margin: '25px', padding: '25px'}}>
                      <figure className='image is-square' >
                        <img 
                          src={`${process.env.REACT_APP_URL}/images/${
                            foodOffer.img
                              ? foodOffer.img
                              : foodOffer.groceryItem.defaultImg
                          }`}
                          alt='foodoffer'
                        />
                      </figure>
                    </div>
                    <div className='card-content has-text-grey-dark'>
                      <div className='media'>
                        <div className='media-left'>
                          <figure className='image is-48x48'>
                            <img
                              src={`${process.env.REACT_APP_URL}/images/${foodOffer
                                .foodSupplier.img &&
                                foodOffer.foodSupplier.img}`}
                              alt='foodsupplier' 
                            />
                          </figure>
                        </div>
                        <div className='media-content'>
                          <p className='title is-4 has-text-black-ter'>
                            {foodOffer.foodSupplier.firstName}
                          </p>
                          <p className='subtitle is-6 has-text-black-ter'>{foodOffer.foodSupplier.lastName}</p>
                        </div>
                      </div>

                      <div className='content'>
                      <div>{foodOffer.description}</div>
                        
                        <br />
                        <div>Offered: { moment(foodOffer.createdAt).format('DD-MM-YY')}</div>
                        <div> {foodOffer.expiryDate && 'Will expire in: ' +   moment(foodOffer.expiryDate).toNow(true)}</div>
                      </div>
                    </div>
                    <footer className='card-footer' >
                      <p className='card-footer-item'>
                        <span>
                          <span
                            id={`modal-button-${index}`}
                            onClick={e => this.openModal(e, index)}
                          >
                            Yeah, gimme!
                          </span>
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
                          foodOffer.groceryItem.name
                        } from ${foodOffer.foodSupplier.firstName} `}</p>
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
                              foodOffer.img
                                ? foodOffer.img
                                : foodOffer.groceryItem.defaultImg
                            }`}
                            alt='foodoffer'
                            style={{width: '200px', margin: 'auto'}}
                          />
                        </figure>

                        <div className='media'>
                          <div className='media-left'>
                            <figure className='image is-48x48'>
                              <img
                                src={`${process.env.REACT_APP_URL}/images/${foodOffer
                                  .foodSupplier.img &&
                                  foodOffer.foodSupplier.img}`}
                                alt='foodsupplier'
                              />
                            </figure>
                          </div>
                          <div className='media-content has-text-black-ter'>
                            <p className='title is-4 has-text-black-ter'>
                              {foodOffer.foodSupplier.firstName}
                            </p>
                            <p className='subtitle is-6 has-text-black-ter'>{foodOffer.foodSupplier.lasttName}</p>
                          </div>
                        </div>
                      </section>
                      <footer className='modal-card-foot'>
                        <button
                          className='button is-success'
                          onClick={e => this.acceptOffer(e, foodOffer._id)}
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

export default FoodOffers;
