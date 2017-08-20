export const activeRoom = (state = {}, action) => {
  switch(action.type) {
    case 'SET_ACTIVE_ROOM':
      console.log("reducer - set active room to ", action.room);
      return action.room;
    default:
      return state;
  }
}