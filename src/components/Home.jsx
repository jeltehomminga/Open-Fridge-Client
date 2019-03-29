import React from "react";
import Signup from "./auth/Signup";

const Home = props => {
  const homeStyle = {
    margin: "0 auto",
    display: "flex",
    width: "70%",
    justifyContent: "",
    alignItems: "center"
  };

  return (
    <div style={homeStyle} id='home-container'>

      <div className="container home-item">
        <img src="/fridgehome.png" alt="" style={{width: '65%'}}/>
      </div>
      <div>
        {props.loggedIn ?         (
          <div className='home-item'>
            <h1 className="is-size-1">Open fridge</h1>
            <h2>Keep it cool!</h2>
          </div>
        )   : (
          <div className='home-item'>
            <h1 className="is-size-1">Open fridge</h1>
            <h2>Sign up now!</h2>
            <Signup />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
