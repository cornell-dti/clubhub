import React, { useState } from 'react';
import { Container, Main, CardFrame } from './styling/StyledHome';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import ClubCard from './components/ClubCard';
import Pagination from './components/Pagination';

const App = () => {
  const [clubs, setClubs] = useState(
    [
      {name: 'Cornell Design & Tech Initiative', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Design & Tech Initiative', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Design & Tech Initiative', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Design & Tech Initiative', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Design & Tech Initiative', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Design & Tech Initiative', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Design & Tech Initiative', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Design & Tech Initiative', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Design & Tech Initiative', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Design & Tech Initiative', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Design & Tech Initiative', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Design & Tech Initiative', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'},
      {name: 'Cornell Design & Tech Initiative', application: 'Developer Application', app_link: 'temp', due: 'October 17, 2020'}
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

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => (
    setSearch(event.target.value)
  );

  const currentCardsDisplay = (
    <div>
      {currentCards.map(club => {
        return <ClubCard
          name={club.name}
          application_link={club.app_link}
          application_name={club.application}
          due_date={club.due} />
      })}
    </div>
  );

  return (
    <Container>
      <Header searchHandler={searchHandler} />
      <Main>
        <Categories />
        <CardFrame>
          <Sort />
          {currentCardsDisplay}
          <Pagination 
            cardsPerPage={cardsPerPage} 
            totalCards={clubs.length}
            paginate={paginate}
          />
        </CardFrame>
      </Main>
    </Container>
  );
};

export default App;

