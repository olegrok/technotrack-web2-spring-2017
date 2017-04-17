import { normalize, schema } from 'normalizr';
import { addUser } from '../actions/users';
import { LOAD_POSTS_SUCCESS, loadPostsSuccess } from '../actions/posts';
import { LOAD_FRIENDS_SUCCESS, loadFriendsSuccess } from '../actions/friendship';

const user = new schema.Entity('users');
const post = new schema.Entity('posts', {
  author: user,
});

const normalizeMiddleware = store => next => (action) => {
  let normalized = {};
  switch (action.type) {
    case LOAD_POSTS_SUCCESS:
      normalized = normalize(action.posts, [post]);
      store.dispatch(addUser(normalized.entities.users));
      return next(loadPostsSuccess(
        normalized.entities.posts,
        normalized.result,
      ));

    case LOAD_FRIENDS_SUCCESS:
      normalized = normalize(action.friends, [user]);
      store.dispatch(addUser(normalized.entities.users));
      return next(loadFriendsSuccess(
        normalized.result,
        action.friendshipType,
      ));
    default:
      return next(action);
  }
};

export default normalizeMiddleware;
