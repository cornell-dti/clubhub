import React from "react";
import { HeaderContainer } from '../styling/StyledHome';

const header = ({ searchHandler }: Props) => {
  return (
    <HeaderContainer>
      <img src={require("../assets/clubhub_logo.svg")} alt="logo" />
      <input type="text" onChange={searchHandler} placeholder="Search..." />
    </HeaderContainer>
  );
};

export default header;

interface Props {
  searchHandler(event: React.ChangeEvent<HTMLInputElement>): void
}