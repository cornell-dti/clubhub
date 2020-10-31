import React, { useState } from 'react';
import { Container, Main, CardFrame } from './styling/StyledHome';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import ClubCard from './components/ClubCard';

const App = () => {
  const [clubsState, _] = useState({
    clubs: [
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
  });

  const clubs = (
    <div >
      {clubsState.clubs.map(club => {
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
      <Header />
      <Main>
        <Categories />
        <CardFrame>
          <Sort />
          {clubs}
        </CardFrame>
      </Main>
    </Container>
  );
};

export default App;
