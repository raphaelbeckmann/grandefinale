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
      <div className="container pt-4 pb-4">
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
      </div>
    </BrowserRouter>
  );
}
