/* global document: true */
/* global window: true */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './styles/bootstrap-3/css/bootstrap.css';

import LayoutComponent from './components/layout';
import PostListLayoutComponent from './components/postListLayout';
import initStore from './store';

class Page extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <LayoutComponent>
          <PostListLayoutComponent />
        </LayoutComponent>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <Provider store={initStore()}>
    <Page />
  </Provider>,
  document.getElementById('root'),
);
