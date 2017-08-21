// import * as firebase from 'firebase';

// Moved below to shared because fetch should happen after change room
// export const fetchAllMessages = (roomId) => {
//   return function (dispatch) {
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

// const fetchMessagesFulfilledAction = (message) => ({
//     type: 'FETCH_MESSAGES_FULFILLED',
//     message
// });

// // Works fine until I refersh the page.
// export const subscribeToMessages = (roomId) => {
//   return function(dispatch) {
//     firebase.database()
//     .ref('messages/'+roomId+'/')
//     .on('child_added', (snap) => {
//       dispatch(fetchMessagesFulfilledAction(snap.val())
//     )}
//     );
//   }
// }

// export const addMessage = (message) => {
//   return function (dispatch) {
//     dispatch(addMessageRequestedAction());
//     const messagesRef = firebase.database().ref('messages/')
//     messagesRef.push(message)
//             .then(() => {
//               dispatch(addMessageFulfilledAction(message));
//             })
//             .catch((error) => {
//               dispatch(addMessageRejectedAction());
//             });
//   }
// }

// const addMessageRequestedAction = () => ({
//   type: 'START_ADDING_MESSAGE'
// });

// const addMessageFulfilledAction = (message) => ({
//   type: 'ADD_MESSAGE_FULFILLED',
//   message
// });

// const addMessageRejectedAction = () => ({
//   type: 'ADD_MESSAGE_REJECTED',
// });