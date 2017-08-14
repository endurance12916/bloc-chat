// action creators return action objects
// However, for asynchronous actions, need to return functions. Thunk allows you to write action creators that return a function instead of an action. The inner function can receive the store methods dispatch and getState as parameters
import * as firebase from 'firebase';

export const fetchMessages = () => {
  return function (dispatch) {
    dispatch(startFetchingMessages());
    firebase.database()
            .ref('messages/'+this.props.room.id+'/') // how to get room.id?
            .on('value', (snapshot) => {
              setTimeout(() => {
                const messages = snapshot.val() || [];
                dispatch(receiveMessages(messages))
              }, 0);
            });
    }
}
export const receiveMessages = (messages) => {
  return function (dispatch) {
    Object.values(messages).forEach(msg => dispatch(addMessage(msg)));
    dispatch(receivedMessages());
  }
}

export const startFetchingMessages = () => ({
    type: 'START_FETCHING_MESSAGES'
});

export const receivedMessages = () => ({
    type: 'RECEIVED_MESSAGES',
});

// Messages
export function addMessage(userId, username, text) {
  return {
    type: 'ADD_MESSAGE', // what happened
    userId,  // what needs to change
    username, // same as username: username
    text
  };
}

export function sendMessage(userId, username, text) {
  return {
    type: 'ADD_MESSAGE', // what happened
    userId,  // what needs to change
    username, // same as username: username
    text
  };
}



// Rooms
export function addRoom(room) {
  return {
    type: 'ADD_ROOM',
    room
  };
}

export function switchRoom(room) {
  return {
    type: 'SWITCH_ROOM',
    room
  };
} 

export function showAddRoom() {
  return {
    type: 'SHOW_ADD_ROOM',
  };
}

export function hideAddRoom() {
  return {
    type: 'HIDE_ADD_ROOM',
  };
}

// Users
export function signUp(id, name) {
  return {
    type: 'SIGN_UP',
    id,
    name
  };
}

export function showSignIn() {
  return {
    type: 'SHOW_SIGN_IN',
  };
}

export function hideSignIn() {
  return {
    type: 'HIDE_SIGN_IN',
  };
}