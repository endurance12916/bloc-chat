export const activeRoom = (state = {}, action) => {
  switch(action.type) {
    case 'SWITCH_ROOM':
      console.log(action)
      console.log("reducer - switching room to", action.room);
      return action.room;
    default: 
      return state;
  }
}