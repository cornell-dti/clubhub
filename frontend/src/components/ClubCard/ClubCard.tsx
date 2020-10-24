import React from "react";
import "./ClubCard.css";

const clubCard = ({application_link, application_name, name, due_date}: Props) => {
  return (
    <div className="Club-container">
      <div className="Club-header-container">
        <img 
          className="Club-logo" 
          src={require("../../assets/dti_logo.svg")}
          alt="logo" />
        <h3 className="Club-name">{name}</h3>
      </div>
      <ul>
        <li className="Club-application">
          <a href={application_link}>
            {application_name}
          </a>
        </li>
        <li>Due: {due_date}</li>
      </ul>
    </div>
  );
};

export default clubCard;

interface Props {
    name: string
    due_date: string
    application_link: string
    application_name: string
}
