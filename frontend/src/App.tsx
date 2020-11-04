import React, { useEffect, useState } from 'react';
import { Container, Main, CardFrame } from './styling/StyledHome';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import ClubCard from './components/ClubCard';
import axios from 'axios';
import { BASE_URL } from './constants';

type ServerApp = {
  id: string;
  name: string;
  foldedName?: string;
  category: string;
  due: string;
  link: string;
  image?: string;
};

const App = () => {
  const [apps, setApps] = useState<ServerApp[]>([]);

  useEffect(() => {
    axios
      .get<ServerApp[]>(`${BASE_URL}/apps`)
      .then((res) => res.data)
      .then(setApps);
  }, []);

  const appCards = (
    <div>
      {apps.map((app) => {
        return (
          <ClubCard
            name={app.name}
            application_link={app.link}
            application_name={app.name + ' Application'}
            due_date={new Date(app.due).toDateString()}
          />
        );
      })}
    </div>
  );

  return (
    <Container>
      <Header />
      <Main>
        <Categories />
        <CardFrame>
          <Sort />
          {appCards}
        </CardFrame>
      </Main>
    </Container>
  );
};

export default App;
