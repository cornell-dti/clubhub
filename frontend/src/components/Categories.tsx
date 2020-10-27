import React from "react";
import { CategoriesContainer } from "../styling/StyledHome";

const categories = () => {
  return (
    <CategoriesContainer>
      <h2>Categories</h2>
      <ul>
        <li><a href="#all">All</a></li>
        <li><a href="#academic">Academic</a></li>
        <li><a href="#cultural">Cultural</a></li>
        <li><a href="#games">Games</a></li>
        <li><a href="#greek">Greek</a></li>
        <li><a href="#political">Political</a></li>
        <li><a href="#project-team">Project Team</a></li>
        <li><a href="#publication-media">Publication/Media</a></li>
        <li><a href="#sustainability">Sustainability</a></li>
        <li><a href="#sports">Sports</a></li>
      </ul>
    </CategoriesContainer>
  );
};

export default categories;
