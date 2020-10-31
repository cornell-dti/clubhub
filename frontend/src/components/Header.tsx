import React from "react";
import { HeaderContainer } from '../styling/StyledHome';

const header = () => {
  return (
    <HeaderContainer>
      <img src={require("../assets/clubhub_logo.svg")} alt="logo" />
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#signin">Sign In</a></li>
        <li><a href="#settings">Settings</a></li>
      </ul>
    </HeaderContainer>
  );
};

export default header;
