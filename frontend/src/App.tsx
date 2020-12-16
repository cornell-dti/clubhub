
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
  const [sortMeth, setSortState] = useState("Due Date");

  useEffect(() => {
    axios
      .get<ServerApp[]>(`${BASE_URL}/apps`)
      .then((res) => res.data)
      .then(setApps);
  }, []);

  const sortHandler = () => {
    setSortState((sortMeth === "Due Date")? "Club Name" : "Due Date");
  }

  const sortedCards = apps.sort(
    (sortMeth === "Due Date")? 
      (a: ServerApp, b: ServerApp) => dateToInt(a.due) - dateToInt(b.due) : 
      (a: ServerApp, b: ServerApp) => a.clubName.localeCompare(b.clubName)
  );

  /**
   * Convert date into number of format yyyymmdd
   * @param date a valid date in the format of Month dd, yyyy
   */
  const dateToInt = (date: string) => {
    const parsedDate: string[] = date.split(" ");
    let strDate: string = parsedDate[2].substring(1);
    switch(parsedDate[0]) {
      case "January": 
        strDate += "01";
        break;
      case "February": 
        strDate += "02";
        break;
      case "March": 
        strDate += "03";
        break;
      case "April": 
        strDate += "04";
        break;
      case "May": 
        strDate += "05";
        break;
      case "June": 
        strDate += "06";
        break;
      case "July": 
        strDate += "07";
        break;
      case "August": 
        strDate += "08";
        break;
      case "September": 
        strDate += "09";
        break;
      case "October": 
        strDate += "10";
        break;
      case "November":
        strDate += "11";
        break;
      case "December": 
        strDate += "12";
        break;
      default: 
        break
    }
    strDate += parsedDate[1];
    return Number(strDate);
  }

  const searchedCards = sortedCards.filter(app => 
    app.appName.toLowerCase().includes(search.toLowerCase()) ||
    app.clubName.toLowerCase().includes(search.toLowerCase())
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
      <Sort 
        sortHandler={sortHandler}
        sortMeth={sortMeth}/>
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

