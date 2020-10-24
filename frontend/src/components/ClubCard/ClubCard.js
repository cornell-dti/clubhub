import React from "react";
import "./ClubCard.css";

const clubCard = (props) => {
  return (
    <div className="Club-container">
      <div className="Club-header-container">
        <img 
          className="Club-logo" 
          src={require("../../assets/dti_logo.svg")}
          alt="logo" />
        <h3 className="Club-name">{props.name}</h3>
      </div>
      <ul>
        <li className="Club-application">
          <a href={props.application_link}>
            {props.application_name}
          </a>
        </li>
        <li>Due: {props.due_date}</li>
      </ul>
    </div>
  );
};

export default clubCard;
