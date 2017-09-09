import * as firebase from 'firebase';
import _ from 'lodash';

const fetchRoomsFulfilledAction = (room) => ({
    type: 'FETCH_ROOMS_FULFILLED',
    room
});

export const subscribeToRooms = () => {
  return function(dispatch) {
    firebase.database()
    .ref('rooms/')
    .on('child_added', (snap) => {
      dispatch(fetchRoomsFulfilledAction(snap.val())
    )}
    );
  }
}

export const addRoom = (room) => {
  return function (dispatch) {
    dispatch(addRoomRequestedAction());
    const roomsRef = firebase.database().ref('rooms/')
    roomsRef.push(room)
            .then(() => {
              dispatch(addRoomFulfilledAction(room));
            })
            .catch((error) => {
              dispatch(addRoomRejectedAction());
            });
  }
}

const addRoomRequestedAction = () => ({
  type: 'START_ADDING_ROOM'
});

const addRoomFulfilledAction = (room) => ({
  type: 'ADD_ROOM_FULFILLED',
  room
});

const addRoomRejectedAction = () => ({
  type: 'ADD_ROOM_REJECTED',
});

export function showAddRoomWindow() {
  return {
    type: 'SHOW_ADD_ROOM',
  };
}

export function hideAddRoomWindow() {
  return {
    type: 'HIDE_ADD_ROOM',
  };
}

function setActiveRoomAction(room) {
  return {
    type: 'SET_ACTIVE_ROOM',
    room
  };
} 

export const setActiveRoom = (room) => {
  return function (dispatch) {
    dispatch(removeDisplayedMessagesAction());
    dispatch(setActiveRoomAction(room));
    dispatch(subscribeToMessages(room.id)); 
  }
}

const fetchMessagesFulfilledAction = (message) => ({
    type: 'FETCH_MESSAGES_FULFILLED',
    message
});

export const subscribeToMessages = (roomId) => {
  return function(dispatch) {
    firebase.database()
    .ref('messages/'+roomId+'/')
    .on('child_added', (snap) => {
      dispatch(fetchMessagesFulfilledAction(snap.val())
    )}
    );
  }
}

export const addMessage = (message, roomId) => {
  return function (dispatch) {
    dispatch(addMessageRequestedAction());
    const messagesRef = firebase.database().ref('messages/'+roomId+'/')
    messagesRef.push(message)
            .then(() => {
              dispatch(addMessageFulfilledAction(message));
            })
            .catch((error) => {
              dispatch(addMessageRejectedAction());
            });
  }
}

const addMessageRequestedAction = () => ({
  type: 'START_ADDING_MESSAGE'
});

const addMessageFulfilledAction = (message) => ({
  type: 'ADD_MESSAGE_FULFILLED',
  message
});

const addMessageRejectedAction = () => ({
  type: 'ADD_MESSAGE_REJECTED',
});

export function updateCurrentMessage(text) {
  return {
    type: 'UPDATE_CURRENT_MESSAGE',
    text
  };
} 

const removeDisplayedMessagesAction = () => ({
    type: 'REMOVE_DISPLAYED_MESSAGES',
});

export function submitMessage() {
  console.log('submitMessage action called')
  return (dispatch, getState) => {
    const state = getState();
    if (_.isEmpty(state.userReducer.activeUser)) {
      return alert('Please sign in first.')
    } else if (_.isEmpty(state.roomsReducer.activeRoom)) {
      return alert('Please select or create a room first.')
    } else {
      dispatch(addMessage({
        username: state.userReducer.activeUser.username,
        createdAt: Date.now(),
        text: state.messagesReducer.currentMessage,
      }, state.roomsReducer.activeRoom.id))
    }
  }
}

export function setActiveUser(username) {
  return {
    type: 'SET_ACTIVE_USER',
    username
  };
}

export const logOutAction = () => ({
  type: 'LOG_OUT'
});


export function showSignInWindow() {
  return {
    type: 'SHOW_SIGN_IN',
  };
}

export function hideSignInWindow() {
  return {
    type: 'HIDE_SIGN_IN',
  };
}

