import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Page, { store } from './app';

ReactDOM.render(
  <Provider store={store}>
    <Page />
  </Provider>,
  document.getElementById('root'),
);
