import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import 'bootstrap';
import '../sass/app.scss';


render(
  <App/>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
