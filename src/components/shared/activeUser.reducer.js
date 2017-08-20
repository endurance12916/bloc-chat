export const activeUser = (state = {}, action) => {
  switch(action.type) {
    case 'SET_ACTIVE_USER':
      console.log("reducer - setting active user");
      return {
        name: action.name
      }
    default: 
      return state;
  }
}