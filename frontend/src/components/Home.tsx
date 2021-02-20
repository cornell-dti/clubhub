import React, { useState } from 'react';
import { Container, Main, CardFrame, ClubGrid } from '../styling/StyledHome';
import Header from './Header';
import Sort from './Sort';
import ClubCard from './ClubCard';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { useEffect } from 'react';
import { format } from 'date-fns';
import CategoriesPanel from './CategoriesPanel';
import { useLocation } from 'react-router-dom';

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

const Home = () => {
  const [apps, setApps] = useState<ServerApp[]>([]);
  const [sortMeth, setSortState] = useState("Due Date");
  const { hash } = useLocation();

  const query = hash.replace('#', '');

  const filteredApps = query ? apps.filter(({ category }) => category === query) : apps;

  useEffect(() => {
    axios
      .get<ServerApp[]>(`${BASE_URL}/apps`)
      .then((res) => res.data)
      .then(setApps);
  }, []);

  const sortHandler = () => {
    setSortState((sortMeth === "Due Date")? "Club Name" : "Due Date");
  }

  const sortedCards = filteredApps.sort(
    (sortMeth === "Due Date")? 
      (a: ServerApp, b: ServerApp) => (new Date(a.due)).getTime() - (new Date(b.due)).getTime() : 
      (a: ServerApp, b: ServerApp) => a.clubName.localeCompare(b.clubName)
  );

  const appCards = (
    <ClubGrid>
      {sortedCards.map((app) => {
        return (
          <ClubCard
            key={app.id}
            name={app.clubName}
            application_link={app.link}
            application_name={app.appName}
            due_date={format(new Date(app.due), "MMMM do, yyyy hh:mm aaaaa'm'")}
            image={app.image}
          />
        );
      })}
    </ClubGrid>
  );

  return (
    <Container>
      <Header />
      <Main>
        <CategoriesPanel />
        <CardFrame>
          <Sort 
            sortHandler={sortHandler}
            sortMeth={sortMeth}/>
          {appCards}
        </CardFrame>
      </Main>
    </Container>
  );
};

export default Home;