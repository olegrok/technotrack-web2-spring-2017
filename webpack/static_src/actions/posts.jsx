export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAIL = 'LOAD_POSTS_FAIL';
export const ADD_POSTS = 'ADD_POSTS';

export function addPosts(postList) {
  return {
    type: ADD_POSTS,
    postList,
  };
}

export function loadPosts() {
  return {
    type: LOAD_POSTS,
  };
}

export function loadPostsSuccess(posts, postIds = []) {
  return {
    type: LOAD_POSTS_SUCCESS,
    posts,
    postIds,
  };
}

export function loadPostsFail() {
  return {
    type: LOAD_POSTS_FAIL,
  };
}
