// every reducer runs when there's an action. need to write logic inside reducers to let them know if they should change a state (use switch statement).
// every reducer will return a discrete property of the state, regardless of how many conditions are inside that reducer. 
export const isFetchingRooms = (state = [], action) => {
    switch (action.type) {
        case 'START_FETCHING_ROOMS':
          console.log("reducer - isFetchingRooms: true");
          return true;
        case 'FETCH_ROOMS_FULFILLED':
          console.log("reducer - isFetchingRooms: false");
          return false;
        default:
            return state
    }
}

export const isAddingRoomToServer = (state = [], action) => {
  switch (action.type) {
      case 'START_ADDING_ROOM':
        console.log("reducer - isAddingRoomToServer: true");
        return true;
      case 'ADD_ROOM_FULFILLED':
        console.log("reducer - isAddingRoomToServer: false");
        return false;
      default:
          return state
  }
}

function createRoom(state = [], action) {
  return {
    id: action.room.id, // first room's state.length is undefined. Why? Is this the best way to fix?
    name: action.room.name
  };
}

export const rooms = (state = [], action) => {
  switch(action.type) {
    case 'FETCH_ROOMS_FULFILLED':
    // case 'ADD_ROOM_FULFILLED':
      console.log("reducer - fetch rooms/add room fulfilled");
      return [...state, createRoom(state, action)];
    default: 
      return state;
  }
}

export const isAddRoomWindowVisible = (state = false, action) => {
  // action is the action object {type:xxx, property:yyy}. Therefore if no property other than type, need to return true/false instead of action.yyy
  switch(action.type) {
    case 'SHOW_ADD_ROOM': // only affects the isAddRoomWindowVisible slice of the state tree
      console.log("reducer - show add room window");
      return true
    case 'HIDE_ADD_ROOM':
      console.log("reducer - hide add room window");
      return false; // should not do return state because state only returns false if no argument passed into it
    default: 
      return state;
  }
}