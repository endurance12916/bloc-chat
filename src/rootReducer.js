import { combineReducers } from 'redux';

import { isFetchingMessages, messages } from './components/messages/messages.reducer';
import { isFetchingRooms, rooms, isAddRoomWindowVisible } from './components/rooms/rooms.reducer';
// import { isAddRoomWindowVisible } from './components/addRoomWindow/addRoomWindow.reducer';
import { isSignInWindowVisible } from './components/user/user.reducer';
import { activeRoom } from './components/shared/activeRoom.reducer'
import { activeUser } from './components/shared/activeUser.reducer'

const rootReducer = combineReducers({
  isFetchingMessages,
  messages,
  isFetchingRooms,
  rooms,
  activeRoom,
  isAddRoomWindowVisible, // : isAddRoomWindowVisible  because ES6
  activeUser,
  isSignInWindowVisible
})

export default rootReducer;