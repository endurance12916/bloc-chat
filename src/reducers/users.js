export const users = (state = [], action) => {
  switch(action.type) {
    case 'SIGN_UP':
      console.log("reducer - user signing up");
      return [...state, {
        id: 'user '+(Object.values(action.users).length),
        name: action.name
      }]
    default: 
      return state;
  }
}

export const showSignIn = (state = {showSignIn: false}, action) => {
  switch(action.type) {
    case 'SHOW_SIGN_IN':
      console.log("reducer - show sign in window");
      return {...state, showSignIn: true};
    case 'HIDE_SIGN_IN':
      console.log("reducer - hide sign in window");
      return state;
    default: 
      return state;
  }
}