
export const shortFormat = (users) => {
  return users.map(user => {
    const { firstName, lastName } = user;
    const fullName = [firstName, lastName].join(' ');
    return { ...user, fullName };
  })
}