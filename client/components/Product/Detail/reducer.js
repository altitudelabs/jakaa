import { Map } from 'immutable';
const prefix = 'PRODUCT_DETAIL'; // Better be unique!!!

const initialState = Map({
  open: false,
});

const getNewState = (state, action) => {
  if (state === undefined) { state = initialState; }
  if (!action) { return state; }
  switch (action.type.replace(`${prefix}_#_`, '')) {
    default:
      return state;
  }
};

export default getNewState;
export { prefix };
