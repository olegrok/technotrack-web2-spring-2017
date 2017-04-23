import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import LayoutComponent from './components/layout';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import './styles/bootstrap-3/css/bootstrap.css';
import routes from './routes';
import initStore from './store';

export const store = initStore();
const history = syncHistoryWithStore(browserHistory, store);

class Page extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router history={history} routes={routes} />
      </MuiThemeProvider>
    );
  }
}

export default Page;
