export const GET_PROFILE = 'GET_PROFILE';

export function setProfile(account) {
  return {
    type: GET_PROFILE,
    account,
  };
}
