import React from "react";
import { CategoriesContainer } from "../styling/StyledHome";

const categories = () => {
  return (
    <CategoriesContainer>
      <h2>Categories</h2>
      <ul>
        <li><a href="#all">All</a></li>
        <li><a href="#impact">Impact</a></li>
        <li><a href="#social">Social</a></li>
        <li><a href="#entrepreneurship">Entrepreneurship</a></li>
        <li><a href="#consulting">Consulting</a></li>
        <li><a href="#education">Education</a></li>
        <li><a href="#opportunity">Opportunity</a></li>
      </ul>
    </CategoriesContainer>
  );
};

export default categories;
