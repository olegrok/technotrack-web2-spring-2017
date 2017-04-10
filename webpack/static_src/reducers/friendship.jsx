import update from 'react-addons-update';
import React from 'react';
import { LOAD_FRIENDS, LOAD_FRIENDS_SUCCESS, LOAD_FRIENDS_FAIL } from '../actions/friendship';
import FriendComponent from '../components/friend';

const initialState = {
  isLoading: false,
  friendsList: [],
  friendshipRequestList: [],
  friendshipWaitList: [],
};

export default function friendship(store = initialState, action) {
  switch (action.type) {
    case LOAD_FRIENDS:
      return update(store, { isLoading: { $set: true } });
    case LOAD_FRIENDS_SUCCESS:
      const friends = action.friends.map(
            friend => (<FriendComponent key={friend} id={friend} bsStyle="" />),
          );
      return update(store, {
        isLoading: { $set: false },
        friendsList: { $merge: friends },
      });
    case LOAD_FRIENDS_FAIL:
      return update(store, { isLoading: { $set: false } });
    default:
      return store;
  }
}
