
export const SELECT_PAGE = 'SELECT_PAGE';

export function selectPage(page) {
  return {
    type: SELECT_PAGE,
    page,
  };
}
