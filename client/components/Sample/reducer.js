import { Map } from 'immutable';
const prefix = 'SAMPLE'; // Better be unique!!!

const initialState = Map({
  open: false,
});

const getNewState = (state, action) => {
  if (state === undefined) { state = initialState; } // eslint-disable-line no-param-reassign
  if (!action) { return state; }
  switch (action.type.replace(`${prefix}_#_`, '')) {
    case 'SET_OPEN':
      return state.set('open', action.open);
    default:
      return state;
  }
};

export default getNewState;
export { prefix };
