/* global document: true */
/* global window: true */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './styles/bootstrap-3/css/bootstrap.css';

import LayoutComponent from './components/layout';
import initStore, { history } from './store';

class Page extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <LayoutComponent />
      </MuiThemeProvider>
    );
  }
}

const mainPage = <Page />;

ReactDOM.render(
  <Provider store={initStore()}>
    <ConnectedRouter history={history}>
      <Page />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
