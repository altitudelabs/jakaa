import { Map } from 'immutable';
const prefix = 'PRODUCT_DETAIL'; // Better be unique!!!

const initialState = Map({
  requestOpen: false,
});

const getNewState = (state, action) => {
  if (state === undefined) { state = initialState; }
  if (!action) { return state; }
  switch (action.type.replace(`${prefix}_#_`, '')) {
    case 'SET_REQUEST_OPEN':
      return state.set('requestOpen', action.open);
    default:
      return state;
  }
};

export default getNewState;
export { prefix };
