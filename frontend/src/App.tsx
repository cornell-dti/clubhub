import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admin from './components/Admin';
import Home from './components/Home';
import { hotjar } from 'react-hotjar';
import { HJID, HJSV } from './constants';

hotjar.initialize(HJID, HJSV);

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
