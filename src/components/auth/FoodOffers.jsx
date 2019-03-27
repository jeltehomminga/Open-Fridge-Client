import React, { Component } from "react";
import axios from "axios";

class FoodOffers extends Component {
  state = {
    foodOffers: []
  };
  componentDidMount() {
    axios({
      method: "get",
      withCredentials: "true",
      url: `http://localhost:5000/api/foodoffers`
    }).then(response => {
      this.setState({ foodOffers: response.data });
    });
  }
  openModal = (e, index) => {
      debugger
      let modal = document.getElementById(`modal-card-${index}`)
      modal.classList.toggle('is-active')
  }
  acceptOffer = (e, offerId) => {
    debugger
    axios({
        method: "post",
        withCredentials: "true",
        url: `http://localhost:5000/api/acceptoffer/${offerId}`
      }).then(response => {
        debugger

        this.props.history.push('/profile');
      })

  }
  render() {
    const equalHeight = {
      height: "100%"
    };

    return (
      <div>
        <section className='section cards'>
          <div className='columns is-multiline'>
            {this.state.foodOffers &&
              this.state.foodOffers.map( (foodOffer, index) => (
                <div className='column is-one-quarter' key={foodOffer._id}>
                  <div className='card' style={equalHeight}>
                    <div className='card-image'>
                      <figure className='image is-4by3'>
                        <img
                          src={`http://localhost:5000/images/${
                            foodOffer.img
                              ? foodOffer.img
                              : foodOffer.groceryItem.defaultImg
                          }`}
                          alt='foodoffer'
                        />
                      </figure>
                    </div>
                    <div className='card-content'>
                      <div className='media'>
                        <div className='media-left'>
                          <figure className='image is-48x48'>
                            <img
                              src={`http://localhost:5000/images/${foodOffer
                                .foodSupplier.img &&
                                foodOffer.foodSupplier.img}`}
                              alt='foodsupplier'
                            />
                          </figure>
                        </div>
                        <div className='media-content'>
                          <p className='title is-4'>
                            {foodOffer.foodSupplier.firstName}
                          </p>
                          <p className='subtitle is-6'>@johnsmith</p>
                        </div>
                      </div>

                      <div className='content'>
                        {foodOffer.description} 

                        <br />
                        <time dateTime='2016-1-1'>11:09 PM - 1 Jan 2016</time>
                      </div>
                    </div>
                    <footer className='card-footer'>
                      <p className='card-footer-item'>
                        <span>
                           <span onClick={(e) => this.acceptOffer(e, foodOffer._id)}>
                            Yes, I want it!
                          </span>
                        </span>
                      </p>
                      <p className='card-footer-item'>
                        <span>
                          Share on <span href='#'>Facebook</span>
                        </span>
                        <button id={`modal-button-${index}`} onClick={(e) => this.openModal(e, index)} >Modal</button>
                      </p>
                    </footer>
                  </div>

                  {/* now the modal card */}
                  <div id={`modal-card-${index}`}className='card modal' style={equalHeight}>
                    <div className='card-image'>
                      <figure className='image is-4by3'>
                        <img
                          src={`http://localhost:5000/images/${
                            foodOffer.img
                              ? foodOffer.img
                              : foodOffer.groceryItem.defaultImg
                          }`}
                          alt='foodoffer'
                        />
                      </figure>
                    </div>
                    <div className='card-content'>
                      <div className='media'>
                        <div className='media-left'>
                          <figure className='image is-48x48'>
                            <img
                              src={`http://localhost:5000/images/${foodOffer
                                .foodSupplier.img &&
                                foodOffer.foodSupplier.img}`}
                              alt='foodsupplier'
                            />
                          </figure>
                        </div>
                        <div className='media-content'>
                          <p className='title is-4'>
                            {foodOffer.foodSupplier.firstName}
                          </p>
                          <p className='subtitle is-6'>@johnsmith</p>
                        </div>
                      </div>

                      <div className='content'>
                        {foodOffer.description} 
                        <br />
                        <time dateTime='2016-1-1'>11:09 PM - 1 Jan 2016</time>
                      </div>
                    </div>
                    <footer className='card-footer'>
                      <p className='card-footer-item'>
                        <span>
                           <a href='https://twitter.com/codinghorror/status/506010907021828096'>
                            Yes, I want it!
                          </a>
                        </span>
                      </p>
                      <p className='card-footer-item'>
                        <span>
                          Share on <span href='#'>Facebook</span>
                        </span>
                      </p>
                    </footer>
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
