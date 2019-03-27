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
  acceptRequest = (e, requestId) => {
    debugger;
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
              this.state.foodRequests.map(foodRequest =>
                                
                (  
                <div className='column is-one-quarter' key={foodRequest._id}>
                  <div className='card' style={equalHeight}>
                    <div className='card-image'>
                      <figure className='image is-4by3'>
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
                        <div className='media-content'>
                          <p className='title is-4'>
                            {foodRequest.foodConsumer.firstName}
                          </p>
                          <p className='subtitle is-6'>@johnsmith</p>
                        </div>
                      </div>

                      <div className='content'>
                        {foodRequest.description}  
                        <time dateTime='2016-1-1'>11:09 PM - 1 Jan 2016</time>
                      </div>
                    </div>
                    <footer class='card-footer'>
                      <p class='card-footer-item'>
                        <span>
                          <div
                            onClick={e =>
                              this.acceptRequest(e, foodRequest._id)
                            }
                          >
                            Yes, I want it!
                          </div>
                        </span>
                      </p>
                      <p class='card-footer-item'>
                        <span>
                          Share on <div href='#'>Facebook</div>
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

export default FoodRequests;
