import store from './store';
import fakerUsers from '../fakers/users';

export const getUsers = ({ page = 0, limit = 10 }) => {
  const offset = page * limit;
  const userCount = fakerUsers.length;
  const users = [...fakerUsers].splice(offset, limit);
  store.dispatch({
    users,
    userCount,
    type: 'SET_USERS',
  });
};

export const shortFormat = (users) => {
  return users.map(user => {
    const { firstName, lastName } = user;
    const fullName = [firstName, lastName].join(' ');
    return { ...user, fullName };
  });
};
