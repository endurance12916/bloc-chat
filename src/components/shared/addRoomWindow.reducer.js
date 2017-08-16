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