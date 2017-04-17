import { FRIENDSHIPS, FRIENDSHIP_REQUESTS, FRIENDSHIP_WAITINGS } from '../components/friend';

export const LOAD_FRIENDS = 'LOAD_FRIENDS';
export const LOAD_FRIENDS_SUCCESS = 'LOAD_FRIENDS_SUCCESS';
export const LOAD_FRIENDS_FAIL = 'LOAD_FRIENDS_FAIL';

export function loadFriends() {
  return {
    type: LOAD_FRIENDS,
  };
}

export function loadFriendsSuccess(friends, type) {
  return {
    type: LOAD_FRIENDS_SUCCESS,
    friends,
    friendshipType: type,
  };
}

export function loadFriendsFail() {
  return {
    type: LOAD_FRIENDS_FAIL,
  };
}

export function fetchFriends(url, field, type) {
  return function (dispatch) {
    if (type === FRIENDSHIPS) {
      dispatch(loadFriends());
    }
    return fetch(url,
      {
        method: 'GET',
        credentials: 'same-origin',
      })
      .then(promise => promise.json())
      .then((json) => {
        dispatch(loadFriendsSuccess(json.map(rec => rec[field]), type));
      });
  };
}
