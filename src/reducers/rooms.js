// every reducer runs when there's an action. need to write logic inside reducers to let them know if they should change a state (use switch statement).
// every reducer will return a discrete property of the state, regardless of how many conditions are inside that reducer. 
const room = (state = [], action) => {
  switch(action.type) {
    case 'ADD_ROOM':
      console.log("reducer - adding room");
      return [...state, {
        id: 'room '+action.rooms.length,
        name: action.name
      }];
    default: 
      return state;
  }
}

export const rooms = (state = [], action) => {
  switch(action.type) {
    case 'ADD_ROOM':
      console.log("reducer - adding room");
      return {...state, [action.room]: room(state, action)
      };
    case 'SWITCH_ROOM':
      console.log("reducer - switching room");
      return [...state, { room: action.room }]
    default: 
      return state;
  }
}

export const showAddRoom = (state = {showAddRoom: false}, action) => {
  switch(action.type) {
    case 'SHOW_ADD_ROOM':
      console.log("reducer - show add room window");
      return { ...state, showAddRoom: true }
      // return action.showAddRoom; <-- is this also right?
    case 'HIDE_ADD_ROOM':
      console.log("reducer - hide add room window");
      return state;
    default: 
      return state;
  }
}