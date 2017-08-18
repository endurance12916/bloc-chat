import * as firebase from 'firebase';

// Fetch Rooms
export const fetchRooms = () => {
  return function (dispatch) {
    dispatch(startFetchingRooms());
    firebase.database()
            .ref('rooms/')
            .on('value', (snapshot) => {
              setTimeout(() => {
                const rooms = snapshot.val() || [];
                Object.values(rooms).forEach(room => dispatch(addRoom(room)));
                dispatch(receivedRooms());
              }, 0);
            });
    }
}
// export const receiveRooms = (rooms) => {
  // return function (dispatch) {
    // Object.values(rooms).forEach(room => dispatch(addRoom(room)));
    // dispatch(receivedRooms());
  // }
// }

export const startFetchingRooms = () => ({
    type: 'START_FETCHING_ROOMS'
});

export const receivedRooms = () => ({
    type: 'RECEIVED_ROOMS',
});


// Rooms
export function addRoom(room) {
  return {
    type: 'ADD_ROOM',
    room
  };
}

// export function switchRoom(room) {
//   return {
//     type: 'SWITCH_ROOM',
//     room
//   };
// } 

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