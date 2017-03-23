import fakerUsers from '../../fakers/users';

const initialState = {
  users: [...fakerUsers],
};

const users = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    default:
      return state;
  }
};

export default users;
