export function setActiveUser(username) {
  return {
    type: 'SET_ACTIVE_USER',
    username
  };
}

export const logOutAction = () => ({
  type: 'LOG_OUT'
});