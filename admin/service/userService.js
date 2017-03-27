import store from './store';
import fakerUsers from '../fakers/users';

export const fetchUsers = (dataSource, { page = 0, limit = 10 }) => {
  const offset = page * limit;
  const userCount = dataSource.length;
  const users = [...dataSource].splice(offset, limit);
  store.dispatch({
    users,
    userCount,
    type: 'SET_USERS',
  });
};

export const getUsers = ({ page = 0, limit = 10 }) => {
  fetchUsers(fakerUsers, { page, limit });
};

export const searchUserBy = (conditions, { page = 0, limit = 10 }) => {
  const results = fakerUsers.filter(user => Object.keys(conditions).map(key => user[key].indexOf(conditions[key]) > -1).indexOf(false) === -1);
  fetchUsers(results, { page, limit });
};

export const getUserBy = (conditions, { page = 0, limit = 10 }) => {
  const results = fakerUsers.filter(user => Object.keys(conditions).map(key => user[key] === conditions[key]).indexOf(false) === -1);
  fetchUsers(results, { page, limit });
};

export const getUserById = (id) => {
  id = parseInt(id, 10);
  const user = fakerUsers.filter(_user => _user.id === id)[0] || {};
  store.dispatch({
    user,
    type: 'SET_USER_DETAIL',
  });
};

export const shortFormat = (users) => {
  return users.map(user => {
    const { firstName, lastName } = user;
    let status;

    ['isApproved', 'banned', 'isDeleted'].forEach(item => {
      if (user[item]) {
        switch (item) {
          case 'isApproved':
            status = 'Enabled';
            break;
          case 'banned':
            status = 'Banned';
            break;
          case 'isDeleted':
            status = 'Deleted';
            break;
          default:
            status = 'Disabled';
            break;
        }
      }
    });

    if (!status) status = 'Disabled';

    const fullName = [firstName, lastName].join(' ');
    return { ...user, fullName, status };
  });
};
