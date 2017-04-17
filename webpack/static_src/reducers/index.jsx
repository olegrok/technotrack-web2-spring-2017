import { combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import router from './router';
import layout from './layout';
import posts from './posts';
import users from './users';
import friendship from './friendship';

export default combineReducers({
  router,
  routing: routerReducer,
  layout,
  posts,
  users,
  friendship,
});
