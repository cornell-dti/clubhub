
import React, { useEffect, useState } from 'react';
import { Container, Main, ClubGrid } from './styling/StyledHome';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import ClubCard from './components/ClubCard';
import Pagination from './components/Pagination';
import axios from 'axios';
import { BASE_URL } from './constants';

type ServerApp = {
  id: string;
  appName: string;
  clubName: string;
  foldedName?: string;
  category: string;
  due: string;
  link: string;
  image?: string;
};


const App = () => {
  const [apps, setApps] = useState<ServerApp[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(12);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get<ServerApp[]>(`${BASE_URL}/apps`)
      .then((res) => res.data)
      .then(setApps);
  }, []);

  const searchedCards = apps.filter(app => 
    //app.name.toLowerCase().includes(search.toLowerCase())
    true
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

  const appCards = (
    <ClubGrid>
      {currentCards.map((app) => {
        return (
          <ClubCard
            name={app.clubName}
            application_link={app.link}
            application_name={app.appName + ' Application'}
            due_date={new Date(app.due).toDateString()}
          />
        );
      })}
    </ClubGrid>
  );

  const cardFrame = 
    currentCards.length === 0 ?
    <h3>No applications available</h3> : 
    <div>
      <Sort />
      {appCards}
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

