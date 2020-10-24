import React from "react";
import "./Header.css";

const header = () => {
  return (
    <div className="Header">
      <img id="logo" src={require("../../assets/clubhub_logo.svg")} alt="logo" />
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#signin">Sign In</a></li>
        <li><a href="#settings">Settings</a></li>
      </ul>
    </div>
  );
};

export default header;
