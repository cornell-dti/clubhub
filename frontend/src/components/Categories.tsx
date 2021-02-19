import React from "react";
import { CategoriesContainer } from "../styling/StyledHome";

const categories = () => {
  return (
    <CategoriesContainer>
      <h2>Categories</h2>
      <h3>By Club</h3>
      <ul>
        <li><a href="#all">All</a></li>
        <li><a href="#community-impact">Community Impact</a></li>
        <li><a href="#research-&-publication">Research & Publication</a></li>
        <li><a href="#investment-funds">Investment Funds</a></li>
        <li><a href="#professional-development">Professional Development</a></li>
        <li><a href="#entrepreneurship">Entrepreneurship</a></li>
        <li><a href="#consulting">Consulting</a></li>
        <li><a href="#education">Education</a></li>
        <li><a href="#marketing">Marketing</a></li>
        <li><a href="#finance">Finance</a></li>
        <li><a href="#specific-industry">Specific Industry</a></li>
      </ul>

      <h3>By Role</h3>
      <ul>
        <li><a href="#all">All</a></li>
        <li><a href="#art">Art</a></li>
        <li><a href="#computer-science">Computer Science</a></li>
        <li><a href="#design">Design</a></li>
        <li><a href="#logistics-events">Logistics/Events</a></li>
        <li><a href="#business">Business</a></li>
        <li><a href="#service">Service</a></li>
        <li><a href="#operations">Operationsl</a></li>
      </ul>
    </CategoriesContainer>
  );
};

export default categories;
