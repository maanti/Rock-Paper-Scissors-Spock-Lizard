import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter, Switch } from 'react-router-dom';
import App from './App';
import Game from './Game';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/:gameId" component={App} />
      <Route exact path="/:gameId/play" component={Game} />
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);
