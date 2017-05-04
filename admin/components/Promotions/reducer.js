const initialState = {
  promotionCount: 0,
  promotions: [],
  limit: 10,
};

const promotions = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case 'SET_PROMOTIONS':
      return { ...state, promotions: action.promotions, promotionCount: action.promotionCount };
    default:
      return state;
  }
};

export default promotions;
