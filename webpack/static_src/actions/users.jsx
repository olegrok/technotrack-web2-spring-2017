export const ADD_USERS = 'ADD_USERS';

export function addUser(users) {
  return {
    type: ADD_USERS,
    users,
  };
}
