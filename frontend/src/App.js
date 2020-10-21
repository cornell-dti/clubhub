import React, {useState} from 'react';
import './App.css';
import Header from './Header/Header';
import Categories from './Categories/Categories';
import ClubCard from './ClubCard/ClubCard';

const App = () => {
  const [clubsState, setClubsState] = useState({
    clubs: [
      {name: 'Club Name 1', application: 'Application 1', due: 'Oct 18, 2020'},
      {name: 'Club Name 2', application: 'Application 1', due: 'Oct 19, 2020'},
      {name: 'Club Name 3', application: 'Application 1', due: 'Oct 20, 2020'}
    ]
  });

  const clubs = (
    <div>
      {clubsState.clubs.map(club => {
        return <ClubCard
          name={club.name}
          application_name={club.application}
          due_date={club.due} />
      })}
    </div>
  );

  return (
    <div>
      <Header />
      <Categories />
      {clubs}
    </div>
  );
};

export default App;
