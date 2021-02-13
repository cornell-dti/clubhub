import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admin from './components/Admin';
import Home from './components/Home';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-69262899-10');
ReactGA.pageview(window.location.pathname + window.location.hash);

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
