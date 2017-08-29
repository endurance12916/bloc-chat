import * as firebase from 'firebase';
import _ from 'lodash';

// -----------------rooms.actions-----------------

// export const fetchAllRooms = () => {
//   return function (dispatch) {
//     dispatch(fetchRoomsRequestedAction());
//     firebase.database()
//             .ref('rooms/')
//             .once('value', (snapshot) => {
//               setTimeout(() => {
//                 const rooms = snapshot.val() || [];
//                 Object.values(rooms).forEach(room => dispatch(fetchRoomsFulfilledAction(room)));
//               }, 0);
//             })
//     }
// }

// const fetchRoomsRequestedAction = () => ({
//     type: 'START_FETCHING_ROOMS'
// });

const fetchRoomsFulfilledAction = (room) => ({
    type: 'FETCH_ROOMS_FULFILLED',
    room
});

// Works fine until I refersh the page. If I have at least one room in database, the below error will pop up after refresh:
// Warning: flattenChildren(...): Encountered two children with the same key, `.$room 0`. Child keys must be unique; when two children share a key, only the first child will be used.
// It seems like it's trying to perform the fetch action once for every room in the databse. I think it's due to 'child_added'. I tried adding 'limitToLast(1)' but didn't work
// this action is used in rooms.container under componentWillMount
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


// -----------------shared/activeRoom.actions-----------------
function setActiveRoomAction(room) {
  return {
    type: 'SET_ACTIVE_ROOM',
    room
  };
} 

// weird behavior: if I switch room, it will render messages from both rooms. How do I fix that?
// this action is called in component/rooms/rooms.component.js

// is it possible to refer to state in here?
export const setActiveRoom = (room) => {
  // clean the room before subscribe
  return function (dispatch) {
    dispatch(removeDisplayedMessagesAction());
    dispatch(setActiveRoomAction(room));
    // dispatch(fetchAllMessages(room.id)); 
    dispatch(subscribeToMessages(room.id)); 
  }
}

// export const fetchAllMessages = (roomId) => {
//   return function (dispatch) {
//     console.log('fetchAllMessages route', ('messages/'+roomId+'/'))
//     dispatch(fetchMessagesRequestedAction());
//     firebase.database()
//             .ref('messages/'+roomId+'/')
//             .once('value', (snapshot) => {
//               setTimeout(() => {
//                 const messages = snapshot.val() || [];
//                 Object.values(messages).forEach(message => dispatch(fetchMessagesFulfilledAction(message)));
//               }, 0);
//             })
//     }
// }

// const fetchMessagesRequestedAction = () => ({
//     type: 'START_FETCHING_MESSAGES'
// });

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


// -----------------shared/activeUser.actions-----------------
export function setActiveUser(username) {
  return {
    type: 'SET_ACTIVE_USER',
    username
  };
}

export const logOutAction = () => ({
  type: 'LOG_OUT'
});


// -----------------user.actions-----------------
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

