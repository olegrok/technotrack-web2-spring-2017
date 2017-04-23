import { userPostSchema } from '../schemas';

export const LOAD_USER_POSTS = 'LOAD_USER_POSTS';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAIL = 'LOAD_USER_POSTS_FAIL';
export const ADD_USER_POSTS = 'ADD_USER_POSTS';

export function addUserPost(posts) {
  return {
    type: ADD_USER_POSTS,
    posts,
  };
}

export function loadUserPosts(id) {
  return {
    type: LOAD_USER_POSTS,
    id,
  };
}

export function loadUserPostsSuccess(userPosts, schema = userPostSchema) {
  return {
    type: LOAD_USER_POSTS_SUCCESS,
    userPosts,
    schema,
  };
}

export function loadUserPostsFail() {
  return {
    type: LOAD_USER_POSTS_FAIL,
  };
}

export function fetchUserPosts(id) {
  return function (dispatch) {
    dispatch(loadUserPosts());
    return fetch('http://localhost:8080/api/posts/?format=json&author='.concat(id),
      {
        method: 'GET',
        credentials: 'same-origin',
      })
      .then(promise => promise.json())
      .then((json) => {
        dispatch(loadUserPostsSuccess(json));
      });
  };
}
