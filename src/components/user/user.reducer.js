export const isSignInWindowVisible = (state = {isSignInWindowVisible: false}, action) => {
  switch(action.type) {
    case 'SHOW_SIGN_IN':
      console.log("reducer - show sign in window");
      return true;
    case 'HIDE_SIGN_IN':
      console.log("reducer - hide sign in window");
      return false;
    default: 
      return state;
  }
}