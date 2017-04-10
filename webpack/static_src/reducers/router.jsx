import { SELECT_PAGE } from '../actions/routing';

export default function router(store = { currentPage: 'news' }, action) {
  switch (action.type) {
    case SELECT_PAGE:
      return { currentPage: action.page };
    default:
      return store;
  }
}
