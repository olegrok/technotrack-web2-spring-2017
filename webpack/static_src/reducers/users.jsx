import update from 'react-addons-update';
import { ADD_USERS } from '../actions/users';

export default function posts(store = { }, action) {
  switch (action.type) {
    case ADD_USERS:
    // console.log(action.type);
      return update(store, {
        $merge: action.users,
      });
    default:
      return store;
  }
}
