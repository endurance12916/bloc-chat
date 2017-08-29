const initialState = {
  isSignInWindowVisible: false,
  activeUser: {},
}

export const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SHOW_SIGN_IN':
      console.log("reducer - show sign in window");
      return {...state, isSignInWindowVisible: true};
    case 'HIDE_SIGN_IN':
      console.log("reducer - hide sign in window");
      return {...state, isSignInWindowVisible: false};
    case 'SET_ACTIVE_USER':
      console.log("reducer - setting active user");
      return {...state, activeUser: {username: action.username}}
    case 'LOG_OUT':
      return {...state, activeUser: {}};
    default: 
      return state;
  }
}