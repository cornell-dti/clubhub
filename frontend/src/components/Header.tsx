import React from "react";
import { HeaderContainer } from '../styling/StyledHome';

const header = () => {
  return (
    <HeaderContainer>
      <img src={require("../assets/clubhub_logo.svg")} alt="logo" />
    </HeaderContainer>
  );
};

export default header;
