import React from "react";
import "./ClubCard.css";

const clubCard = (props) => {
  return (
    <div className="ClubCard">
      <h1>Club Name: {props.name}</h1>
      <ul>
        <li>{props.application_name}</li>
        <li>Due: {props.due_date}</li>
      </ul>
    </div>
  );
};

export default clubCard;
