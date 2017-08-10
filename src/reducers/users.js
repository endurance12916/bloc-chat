export function users(state = [], action) {
  switch(action.type) {
    case 'SIGN_UP':
      console.log("reducer - user signing up");
      return [...state, {
        id: 'user '+(Object.values(action.users).length),
        name: name
      }]
    case 'SHOW_SIGN_IN':
      console.log("reducer - show sign in window");
      return {...state, showSignIn: true}
    case 'HIDE_SIGN_IN':
      console.log("reducer - hide sign in window");
      return {...state, hideSignIn: true}
    default: 
      return state;
  }
}