import React from "react";
import "./Categories.css";

const categories = () => {
  return (
    <div className="Categories">
      <h4>Categories</h4>
      <ul>
        <li><a href="#all">All</a></li>
        <li><a href="#greek">Greek</a></li>
        <li><a href="#project-team">Project Team</a></li>
        <li><a href="#publications">Publications</a></li>
        <li><a href="#cultural">Cultural</a></li>
      </ul>
    </div>
  );
};

export default categories;
