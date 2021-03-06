// every reducer runs when there's an action. need to write logic inside reducers to let them know if they should change a state (use switch statement).
// every reducer will return a discrete property of the state, regardless of how many conditions are inside that reducer. 
const initialState = {
  isFetchingRooms: false,
  isAddingRoomToServer: false,
  rooms: [],
  isAddRoomWindowVisible: false,
  activeRoom: {},
}

function createRoom(state = [], action) {
  return {
    id: action.room.id, 
    name: action.room.name
  };
}

export const roomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_FETCHING_ROOMS':
      console.log("reducer - isFetchingRooms: true");
      return {...state, isFetchingRooms: true};
    case 'FETCH_ROOMS_FULFILLED':
      console.log("reducer - isFetchingRooms: false");
      return {...state, 
        isFetchingRooms: false,
        rooms: [...state.rooms, createRoom(state, action)]
      };
    case 'START_ADDING_ROOM':
      console.log("reducer - isAddingRoomToServer: true");
      return {...state, isAddingRoomToServer: true};
    case 'ADD_ROOM_FULFILLED':
      console.log("reducer - isAddingRoomToServer: false");
      return {...state, isAddingRoomToServer: false};
    case 'SHOW_ADD_ROOM': 
      console.log("reducer - show add room window");
      return {...state, isAddRoomWindowVisible: true};
    case 'HIDE_ADD_ROOM':
      console.log("reducer - hide add room window");
      return {...state, isAddRoomWindowVisible: false};
    case 'SET_ACTIVE_ROOM':
      console.log("reducer - set active room to ", action.room);
      return {...state, activeRoom: action.room};
    default:
      return state
  }
}

// export const isFetchingRooms = (state = [], action) => {
//     switch (action.type) {
//         case 'START_FETCHING_ROOMS':
//           console.log("reducer - isFetchingRooms: true");
//           return true;
//         case 'FETCH_ROOMS_FULFILLED':
//           console.log("reducer - isFetchingRooms: false");
//           return false;
//         default:
//             return state
//     }
// }

// export const isAddingRoomToServer = (state = [], action) => {
//   switch (action.type) {
//       case 'START_ADDING_ROOM':
//         console.log("reducer - isAddingRoomToServer: true");
//         return true;
//       case 'ADD_ROOM_FULFILLED':
//         console.log("reducer - isAddingRoomToServer: false");
//         return false;
//       default:
//           return state
//   }
// }

// export const rooms = (state = [], action) => {
//   switch(action.type) {
//     case 'FETCH_ROOMS_FULFILLED':
//     // case 'ADD_ROOM_FULFILLED':
//       console.log("reducer - fetch rooms/add room fulfilled");
//       return [...state, createRoom(state, action)];
//     default: 
//       return state;
//   }
// }

// export const isAddRoomWindowVisible = (state = false, action) => {
//   // action is the action object {type:xxx, property:yyy}. Therefore if no property other than type, need to return true/false instead of action.yyy
//   switch(action.type) {
//     case 'SHOW_ADD_ROOM': // only affects the isAddRoomWindowVisible slice of the state tree
//       console.log("reducer - show add room window");
//       return true
//     case 'HIDE_ADD_ROOM':
//       console.log("reducer - hide add room window");
//       return false; // should not do return state because state only returns false if no argument passed into it
//     default: 
//       return state;
//   }
// }