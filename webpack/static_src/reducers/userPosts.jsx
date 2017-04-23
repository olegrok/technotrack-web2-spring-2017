import React from 'react';
import update from 'react-addons-update';
import UserPostComponent from '../components/userPost';

import { LOAD_USER_POSTS, LOAD_USER_POSTS_SUCCESS, LOAD_USER_POSTS_FAIL, ADD_USER_POSTS } from '../actions/userPosts';

const initialState = {
  posts: {},
  isLoading: false,
  userPostList: [],
};

export default function userPosts(store = initialState, action) {
  switch (action.type) {
    case LOAD_USER_POSTS:
      return update(store, { isLoading: { $set: true } });
    case LOAD_USER_POSTS_SUCCESS:
      const list = action.userPosts.map(post => <UserPostComponent key={post} id={post} />);
      return update(store, {
        isLoading: { $set: false },
        userPostList: {
          $set: list,
        },
      });
    case LOAD_USER_POSTS_FAIL:
      return update(store, {
        isLoading: { $set: false },
      });

    case ADD_USER_POSTS:
      return update(store, {
        posts: {
          $merge: action.posts,
        },
      });
    default:
      return store;
  }
}
