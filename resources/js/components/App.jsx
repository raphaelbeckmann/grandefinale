import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import List from './List';
import Show from './Show';
import Form from './Form';


export default function App() {
  return (
    <BrowserRouter basename="/react">
      <div>
        <nav>
          <Link to="/">Formular</Link>
          {' '}&bull;{' '}
          <Link to="/list">Liste</Link>
        </nav>
      </div>

      <Switch>
        <Route path="/list">
          <List/>
        </Route>
        <Route path="/show/:kundeId">
          <Show/>
        </Route>
        <Route path="/">
          <Form/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
