import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import initReducers from './reducers/index';
import normalizationMiddleware from './middleware/normalize';

export default function initStore() {
  const initialStore = {};
  return createStore(initReducers, initialStore,
    composeWithDevTools(applyMiddleware(
      thunk,
      normalizationMiddleware,
    )));
}
