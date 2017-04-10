import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const func = store => next => (action) => {
  const result = next(action);
  return result;
};

const reducers = combineReducers({
  // reducers
});

export function initStore() {
  const initialStore = {};
  return createStore(reducers, initialStore,
    composeWithDevTools(applyMiddleware(func, window.DevTool)));
}
