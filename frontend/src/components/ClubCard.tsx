import React from "react";
import { ClubCardContainer, ClubHeaderContainer } from '../styling/StyledHome';

const clubCard = ({application_link, application_name, name, due_date, image}: Props) => {
  return (
    <ClubCardContainer>
      <ClubHeaderContainer>
        {(image !== undefined)? 
          <img src={image} alt={name+" image"} /> : 
          <h1>{name}</h1>
        }
      </ClubHeaderContainer>
      <ul>
        <li><a href={application_link}>{application_name}</a>
        </li><li>Due: {due_date}</li>
      </ul>
    </ClubCardContainer>
  );
};

export default clubCard;

interface Props {
    name: string
    due_date: string
    application_link: string
    application_name: string
    image?: string
}
