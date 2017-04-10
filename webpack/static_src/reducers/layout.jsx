import { GET_PROFILE } from '../actions/account';

const initialState = {
  pk: 0,
  username: '',
  first_name: '',
  last_name: '',
  avatar: null,
};

export default function layout(store = { account: initialState }, action) {
  switch (action.type) {
    case GET_PROFILE:
      return { account: action.account };
    default:
      return store;
  }
}
