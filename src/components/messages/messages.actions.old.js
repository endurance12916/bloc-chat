import * as firebase from 'firebase';
// Fetch Messages
export const fetchMessages = (roomId) => {
  return function (dispatch) {
    dispatch(startFetchingMessages());
    firebase.database()
            .ref('messages/'+roomId+'/') // how to get room.id?
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
