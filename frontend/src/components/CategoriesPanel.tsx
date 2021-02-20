import React, { useState } from "react";
import { CategoriesContainer, CategoriesToggle } from "../styling/StyledHome";
import { categories } from "../constants";

const Panel = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div>
      <CategoriesToggle>
        <img
          onClick={() => setOpenMenu(!openMenu)} 
          src={require("../assets/menu.svg")} 
          alt="sort icon"/>
      </CategoriesToggle>
      <CategoriesContainer openMenu={openMenu}>
        <h2>Categories</h2>
        <ul>
          {categories.map(({ name, url }) => (
            <li key={url}>
              <a href={`#${url}`}>{name}</a>
            </li>
          ))}
        </ul>
      </CategoriesContainer>
    </div>
  );
};

export default Panel;
