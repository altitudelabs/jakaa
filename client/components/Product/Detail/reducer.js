import { Map } from 'immutable';
const prefix = 'PRODUCT_DETAIL'; // Better be unique!!!

const initialState = Map({
  requestOpen: false,
  TOCOpen: false,
});

const getNewState = (state, action) => {
  if (state === undefined) { state = initialState; }
  if (!action) { return state; }
  switch (action.type.replace(`${prefix}_#_`, '')) {
    case 'SET_REQUEST_OPEN':
      return state.set('requestOpen', action.open);
    case 'SET_TOC_OPEN':
      return state.set('TOCOpen', action.open);
    default:
      return state;
  }
};

export default getNewState;
export { prefix };
