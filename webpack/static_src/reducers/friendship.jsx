import update from 'react-addons-update';
import React from 'react';
import { LOAD_FRIENDS, LOAD_FRIENDS_SUCCESS, LOAD_FRIENDS_FAIL } from '../actions/friendship';
import FriendComponent, { FRIENDSHIPS, FRIENDSHIP_REQUESTS, FRIENDSHIP_WAITINGS } from '../components/friend';

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
            friend => (<FriendComponent key={friend} id={friend} type={action.friendshipType} />),
          );

      let bufStore;
      switch (action.friendshipType) {
        case FRIENDSHIPS:
          bufStore = update(store, { friendsList: { $merge: friends } });
          break;
        case FRIENDSHIP_REQUESTS:
          bufStore = update(store, { friendshipRequestList: { $merge: friends } });
          break;
        case FRIENDSHIP_WAITINGS:
          bufStore = update(store, { friendshipWaitList: { $merge: friends } });
          break;
        default:
          bufStore = update(store, { friendsList: { $merge: friends } });
      }

      return update(bufStore, {
        isLoading: { $set: false },
      });
    case LOAD_FRIENDS_FAIL:
      return update(store, { isLoading: { $set: false } });
    default:
      return store;
  }
}
