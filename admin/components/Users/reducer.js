const initialState = {
  userCount: 0,
  users: [],
  limit: 10,
};

const users = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.users, userCount: action.userCount };
    default:
      return state;
  }
};

export default users;
