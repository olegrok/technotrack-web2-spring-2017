import { postSchema } from '../schemas';

export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAIL = 'LOAD_POSTS_FAIL';
export const ADD_POSTS = 'ADD_POSTS';
export const SHOW_MODAL = 'SHOW_MODAL';

export function addPost(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function loadPosts() {
  return {
    type: LOAD_POSTS,
  };
}

export function loadPostsSuccess(posts, schema = postSchema) {
  return {
    type: LOAD_POSTS_SUCCESS,
    posts,
    schema,
  };
}

export function loadPostsFail() {
  return {
    type: LOAD_POSTS_FAIL,
  };
}

export function showModal(id, option) {
  return {
    type: SHOW_MODAL,
    id,
    option,
  };
}

export function fetchPosts() {
  return function (dispatch) {
    dispatch(loadPosts());
    return fetch('http://localhost:8080/api/events/',
      {
        method: 'GET',
        credentials: 'same-origin',
      })
      .then(promise => promise.json())
      .then((json) => {
        dispatch(loadPostsSuccess(json));
      });
  };
}
