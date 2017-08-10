// every reducer runs when there's an action. need to write logic inside reducers to let them know if they should change a state (use switch statement)

export function rooms(state = [], action) {
  switch(action.type) {
    case 'ADD_ROOM':
      console.log("reducer - adding room");
      return [...state, {
        id: 'room '+(Object.values(action.rooms).length),
        name: name
      }]
    case 'SWITCH_ROOM':
      console.log("reducer - switching room");
      return {...state, room: action.room}
    case 'SHOW_ADD_ROOM':
      console.log("reducer - show add room window");
      return {...state, showAddRoom: true}
    case 'HIDE_ADD_ROOM':
      console.log("reducer - hide add room window");
      return {...state, hideAddRoom: true}
    default: 
      return state;
  }
}