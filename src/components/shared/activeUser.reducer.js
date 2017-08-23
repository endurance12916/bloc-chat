export const activeUser = (state = {}, action) => {
  switch(action.type) {
    case 'SET_ACTIVE_USER':
      console.log("reducer - setting active user");
      return {
        username: action.username
      }
    case 'LOG_OUT':
      return state = {};
    default: 
      return state;
  }
}