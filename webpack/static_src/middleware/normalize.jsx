import { normalize } from 'normalizr';
import { addUser } from '../actions/users';
import { addPost } from '../actions/posts';
import { addUserPost } from '../actions/userPosts';

const normalizationMiddleware = store => next => (action) => {
  let normalized = {};
  if (action.schema) {
    normalized = normalize(action[action.schema.key], [action.schema]);
    action.normalized = true;
    if (normalized.entities.users) {
      store.dispatch(addUser(normalized.entities.users));
    }
    if (normalized.entities.posts) {
      store.dispatch(addPost(normalized.entities.posts))
    }
    if (normalized.entities.userPosts) {
      store.dispatch(addUserPost(normalized.entities.userPosts))
    }
    action[action.schema.key] = normalized.result;
    // console.log(action);
  }

  return next(action);
};

export default normalizationMiddleware;
