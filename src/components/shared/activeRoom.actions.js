import * as firebase from 'firebase';

function setActiveRoomAction(room) {
  return {
    type: 'SET_ACTIVE_ROOM',
    room
  };
} 

// weird behavior: if I switch room, it will render messages from both rooms. How do I fix that?
// this action is called in component/rooms/rooms.component.js
export const setActiveRoom = (room) => {
  console.log('setActiveRoom action', room)
  return function (dispatch) {
    dispatch(setActiveRoomAction(room));
    dispatch(fetchAllMessages(room.id)); 
    dispatch(subscribeToMessages(room.id)); 
  }
}

export const fetchAllMessages = (roomId) => {
  return function (dispatch) {
    console.log('fetchAllMessages route', ('messages/'+roomId+'/'))
    dispatch(fetchMessagesRequestedAction());
    firebase.database()
            .ref('messages/'+roomId+'/')
            .once('value', (snapshot) => {
              setTimeout(() => {
                const messages = snapshot.val() || [];
                Object.values(messages).forEach(message => dispatch(fetchMessagesFulfilledAction(message)));
              }, 0);
            })
    }
}

const fetchMessagesRequestedAction = () => ({
    type: 'START_FETCHING_MESSAGES'
});

const fetchMessagesFulfilledAction = (message) => ({
    type: 'FETCH_MESSAGES_FULFILLED',
    message
});

export const subscribeToMessages = (roomId) => {
  console.log('subscribe to messages')
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
  console.log('text', text) // this correctly returns the message I typed in
  return {
    type: 'UPDATE_CURRENT_MESSAGE',
    text
  };
} 