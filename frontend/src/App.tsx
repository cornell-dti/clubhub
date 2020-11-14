import React, { useState } from 'react';
import { Container, Main, ClubGrid } from './styling/StyledHome';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import ClubCard from './components/ClubCard';
import Pagination from './components/Pagination';

const App = () => {
  const [clubs] = useState(
    [
      {name: 'AguaClara Cornell', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Autonomous Bicycle', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Concrete Canoe', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell AppDev', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Baja Racing', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell ChemE Car', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Cup Robotics', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Data Science', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Design and Tech Initiative', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Design Build Fly', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Electric Vehicles', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Engaged IoT', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Engineering World Health', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Hyperloop', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell ICPC', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell iGem', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Mars Rover', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Micro-G', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Racing', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'}
    ]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(12);
  const [search, setSearch] = useState("");

  const searchedCards = clubs.filter(club => 
    club.name.toLowerCase().includes(search.toLowerCase()) || 
    club.application.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = searchedCards.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber: number) => (
    setCurrentPage(pageNumber)
  );

  const searchHandler = function(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const currentCardsDisplay = (
    <ClubGrid>
      {currentCards.map(club => {
        return <ClubCard
          name={club.name}
          application_link={club.app_link}
          application_name={club.application}
          due_date={club.due} />
      })}
      
    </ClubGrid>
  );

  const cardFrame = 
    currentCards.length === 0 ?
    <h3>No applications available</h3> : 
    <div>
      <Sort />
      {currentCardsDisplay}
      <Pagination 
        cardsPerPage={cardsPerPage} 
        totalCards={searchedCards.length}
        paginate={paginate}
      />
    </div>
    

  return (
    <Container>
      <Header searchHandler={searchHandler} />
      <Main>
        <Categories />
        {cardFrame}
      </Main>
    </Container>
  );
};

export default App;

