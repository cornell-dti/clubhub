import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Categories from './components/Categories/Categories';
import Sort from './components/Sort/Sort';
import ClubCard from './components/ClubCard/ClubCard';

const App = () => {
  const [clubsState, setClubsState] = useState({
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
    <div className="Container">
      <Header />
        <div className="Main">
            <Categories />
            <div className="CardFrame">
                <Sort />
                {clubs}
            </div>
        </div>
    </div>
  );
};

export default App;
