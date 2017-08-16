export const activeUser = (state = {}, action) => {
  switch(action.type) {
    case 'SIGN_UP':
      console.log("reducer - user signing up");
      return {
        name: action.name
      }
    default: 
      return state;
  }
}