// action creators return action objects
// However, for asynchronous actions, need to return functions. Thunk allows you to write action creators that return a function instead of an action. The inner function can receive the store methods dispatch and getState as parameters
// import * as firebase from 'firebase';

// Should these fetch functions be here or in reducers?
// Fetch Messages
// export const fetchMessages = (roomId) => {
//   return function (dispatch) {
//     dispatch(startFetchingMessages());
//     firebase.database()
//             .ref('messages/'+roomId+'/') // how to get room.id?
//             .on('value', (snapshot) => {
//               setTimeout(() => {
//                 const messages = snapshot.val() || [];
//                 dispatch(receiveMessages(messages))
//               }, 0);
//             });
//     }
// }
// export const receiveMessages = (messages) => {
//   return function (dispatch) {
//     Object.values(messages).forEach(msg => dispatch(addMessage(msg)));
//     dispatch(receivedMessages());
//   }
// }

// export const startFetchingMessages = () => ({
//     type: 'START_FETCHING_MESSAGES'
// });

// export const receivedMessages = () => ({
//     type: 'RECEIVED_MESSAGES',
// });

// // Fetch Rooms
// export const fetchRooms = () => {
//   return function (dispatch) {
//     dispatch(startFetchingRooms());
//     firebase.database()
//             .ref('rooms/')
//             .on('value', (snapshot) => {
//               setTimeout(() => {
//                 const rooms = snapshot.val() || [];
//                 Object.values(rooms).forEach(room => dispatch(addRoom(room)));
//                 dispatch(receivedRooms());
//               }, 0);
//             });
//     }
// }
// // export const receiveRooms = (rooms) => {
//   // return function (dispatch) {
//     // Object.values(rooms).forEach(room => dispatch(addRoom(room)));
//     // dispatch(receivedRooms());
//   // }
// // }

// export const startFetchingRooms = () => ({
//     type: 'START_FETCHING_ROOMS'
// });

// export const receivedRooms = () => ({
//     type: 'RECEIVED_ROOMS',
// });

// Messages
// export function addMessage(userId, username, text) {
//   return {
//     type: 'ADD_MESSAGE', // what happened
//     userId,  // what needs to change
//     username, // same as username: username
//     text
//   };
// }

// export function sendMessage(userId, username, text) {
//   return {
//     type: 'ADD_MESSAGE', // what happened
//     userId,  // what needs to change
//     username, // same as username: username
//     text
//   };
// }



// // Rooms
// export function addRoom(room) {
//   console.log('addRoom called', room)
//   return {
//     type: 'ADD_ROOM',
//     room
//   };
// }

// export function switchRoom(room) {
//   return {
//     type: 'SWITCH_ROOM',
//     room
//   };
// } 

// export function showAddRoomWindow() {
//   return {
//     type: 'SHOW_ADD_ROOM',
//   };
// }

// export function hideAddRoomWindow() {
//   return {
//     type: 'HIDE_ADD_ROOM',
//   };
// }

// Users
// export function signUp(id, name) {
//   return {
//     type: 'SIGN_UP',
//     id,
//     name
//   };
// }

// export function showSignInWindow() {
//   return {
//     type: 'SHOW_SIGN_IN',
//   };
// }

// export function hideSignInWindow() {
//   return {
//     type: 'HIDE_SIGN_IN',
//   };
// }