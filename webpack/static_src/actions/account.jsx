import { addUser } from './users';

export const GET_PROFILE = 'GET_PROFILE';

export function setProfile(account) {
  return {
    type: GET_PROFILE,
    account,
  };
}

export function fetchProfile() {
  return function (dispatch) {
    return fetch('http://localhost:8080/api/users/?format=json',
      {
        method: 'GET',
        credentials: 'same-origin',
      }).then(promise => promise.json())
        .then((json) => {
          dispatch(addUser({
            [json[0].id]: json[0],
          }));
          dispatch(setProfile(json[0]));
        });
  };
}
