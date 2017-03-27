const initialState = {
  id: null,
};

const userDetail = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case 'SET_USER_DETAIL':
      return { ...state, ...action.user };
    default:
      return state;
  }
};

export default userDetail;
