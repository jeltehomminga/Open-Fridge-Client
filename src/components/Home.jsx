import React from "react";
import Signup from "./auth/Signup";

const Home = props => {
  const homeStyle = {
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    width: "70%",
    justifyContent: "",
    alignItems: "center"
  };

  return (
    <div style={homeStyle}>

      <div>
        <img src="/fridgehome.png" alt="" />
      </div>
      <div>
        {props.loggedIn !== true && (
          <div>
            <h2>Sign up now!</h2>
            <Signup />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
