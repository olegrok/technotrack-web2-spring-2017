import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import thunk from 'redux-thunk';

import initReucers from './reducers/index';
import normalizeMiddleware from './middleware/normalize';

export const history = createHistory();
const routingMiddleware = routerMiddleware(history);

export default function initStore() {
  const initialStore = {};
  return createStore(initReucers, initialStore,
    composeWithDevTools(applyMiddleware(
      routingMiddleware,
      normalizeMiddleware,
      thunk,
    )));
}
