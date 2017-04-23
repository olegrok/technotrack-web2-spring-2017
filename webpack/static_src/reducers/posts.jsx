import { Map, Record } from 'immutable';
import React from 'react';
import update from 'react-addons-update';
import PostComponent from '../components/post';

import { LOAD_POSTS, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL, SHOW_MODAL, ADD_POSTS } from '../actions/posts';

const initialState = {
  posts: {},
  isLoading: false,
  postList: [],
};

export default function posts(store = initialState, action) {
  switch (action.type) {
    case LOAD_POSTS:
      // return store.set('isLoading', true);
      return update(store, { isLoading: { $set: true } });
    case LOAD_POSTS_SUCCESS:
      const list = action.posts.map(post => <PostComponent key={post} id={post} />);
      return update(store, {
        isLoading: { $set: false },
        postList: {
          $set: list,
        },
      });

    case LOAD_POSTS_FAIL:
      return update(store, { isLoading: { $set: false } });

    case SHOW_MODAL:
      return update(store, {
        posts: {
          [action.id]: {
            modal: {
              $set: action.option,
            },
          },
        },
      });

    case ADD_POSTS:
      return update(store, {
        posts: {
          $merge: action.posts,
        },
      });

    default:
      return store;
  }
}
