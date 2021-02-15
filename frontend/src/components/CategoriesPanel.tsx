import React from "react";
import { CategoriesContainer } from "../styling/StyledHome";
import { categories } from "../constants";

const panel = () => {
  return (
    <CategoriesContainer>
      <h2>Categories</h2>
      <ul>
        {categories.map(({ name, url }) => (
          <li key={url}>
            <a href={`#${url}`}>{name}</a>
          </li>
        ))}
      </ul>
    </CategoriesContainer>
  );
};

export default panel;
