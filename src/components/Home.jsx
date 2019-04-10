import React from "react";
import Signup from "./auth/Signup";

const Home = props => {
  const homeStyle = {
    margin: "0 auto",
    display: "flex",
    width: "100%",
    justifyContent: "",
    alignItems: "center"
  };

  return (
    <div style={homeStyle} id='home-container'>

      <div className="container home-item">
        <img src="/fridgehome.png" alt="" style={{width: '65%'}}/>
      </div>
      <div style={{width: '100%'}}>
        {props.loggedIn ?         (
          <div className='home-item'>
            <h1 className="is-size-1" style={{marginBottom: '20px'}}>Open fridge</h1>
            <h2>Keep it cool!</h2>
          </div>
        )   : (
          <div className='home-item' style={{width: '100%'}}>
            <h1 className="is-size-1" style={{marginBottom: '20px'}}>Open fridge</h1>

            <Signup {...props}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
