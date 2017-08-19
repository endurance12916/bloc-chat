import * as firebase from 'firebase';

// Fetch Rooms
export const fetchAllRooms = () => {
  return function (dispatch) {
    dispatch(fetchRoomsRequestedAction());
    firebase.database()
            .ref('rooms/')
            .once('value', (snapshot) => {
              setTimeout(() => {
                const rooms = snapshot.val() || [];
                Object.values(rooms).forEach(room => dispatch(fetchRoomsFulfilledAction(room)));
              }, 0);
            })
            // .catch((error) => {      
            //   console.log(error);
            //   dispatch(fetchRoomsRejectedAction());
            // });
    }
}

const fetchRoomsRequestedAction = () => ({
    type: 'START_FETCHING_ROOMS'
});

const fetchRoomsFulfilledAction = (room) => ({
    type: 'FETCH_ROOMS_FULFILLED',
    room
});

// Works fine until I refersh the page. the below error pops up after refresh:
// Warning: flattenChildren(...): Encountered two children with the same key, `.$room 0`. Child keys must be unique; when two children share a key, only the first child will be used.
// I think it's due to 'child_added'. I tried adding 'limitToLast(1)' but didn't work
export const subscribeToRooms = () => {
  console.log('subscribeToRooms event listener called')
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