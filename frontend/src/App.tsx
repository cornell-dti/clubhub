import React, { useEffect, useState } from 'react';
import { Container, Main, CardFrame } from './styling/StyledHome';
import Header from './components/Header';
import CategoriesPanel from './components/CategoriesPanel';
import Sort from './components/Sort';
import ClubCard from './components/ClubCard';
import axios from 'axios';
import { BASE_URL } from './constants';
import { useHash } from './hooks/useHash';

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
  const [hash] = useHash();

  const query = hash.replace('#', '');
  const filteredApps = query ? apps.filter(({ category }) => category === query) : apps;

  useEffect(() => {
    axios
      .get<ServerApp[]>(`${BASE_URL}/apps`)
      .then((res) => res.data)
      .then(setApps);
  }, []);

  const appCards = (
    <div>
      {filteredApps.map((app) => {
        return (
          <ClubCard
            key={app.id}
            name={app.clubName}
            application_link={app.link}
            application_name={app.appName}
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
        <CategoriesPanel />
        <CardFrame>
          <Sort />
          {appCards}
        </CardFrame>
      </Main>
    </Container>
  );
};

export default App;
