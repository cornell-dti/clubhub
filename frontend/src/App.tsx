import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admin from './components/Admin';
import Home from './components/Home';
import ReactGA from 'react-ga';
import { GA_TRACKING_ID } from './constants';
import { hotjar } from 'react-hotjar';
import { HJID, HJSV } from './constants';

ReactGA.initialize(GA_TRACKING_ID);
ReactGA.pageview(window.location.pathname + window.location.hash);

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
