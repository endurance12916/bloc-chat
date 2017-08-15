// every reducer runs when there's an action. need to write logic inside reducers to let them know if they should change a state (use switch statement).
// every reducer will return a discrete property of the state, regardless of how many conditions are inside that reducer. 
export const isFetchingRooms = (state = [], action) => {
    switch (action.type) {
        case 'START_FETCHING_ROOMS':
          console.log("reducer - start fetching rooms");
          return Object.assign({}, state, {
              isFetchingRooms: true
          });
        case 'RECEIVED_ROOMS':
          console.log("reducer - receiving rooms");
          return Object.assign({}, state, {
              isFetchingRooms: false,
          });
        default:
            return state
    }
}
  
// const room = (state = [], action) => {
//   switch(action.type) {
//     case 'ADD_ROOM':
//       console.log("reducer - adding room", action);
      // return [...state, {
      //   id: 'room '+state.length,
      //   name: action.name
      // }];
//     default: 
//       return state;
//   }
// }
function createRoom (state, action) {
        return {
        id: 'room '+state.length,
        name: action.room.name
      };
}
    
export const rooms = (state = [], action) => {
  switch(action.type) {
    case 'ADD_ROOM':
      console.log("reducer - adding room", action);
      return [...state, createRoom(state, action)
      ];
    case 'SWITCH_ROOM':
      console.log("reducer - switching room");
      return [...state, { room: action.room }]
    default: 
      return state;
  }
}

export const showAddRoom = (state = false, action) => {
  switch(action.type) {
    case 'SHOW_ADD_ROOM': // only affects the showAddRoom slice of the state tree
      console.log("reducer - show add room window", { ...state, showAddRoom: true });
      return true
      // return action.showAddRoom; <-- is this also right?
    case 'HIDE_ADD_ROOM':
      console.log("reducer - hide add room window");
      return false;
    default: 
      return state;
  }
}