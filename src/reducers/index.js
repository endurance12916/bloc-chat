import { combineReducers } from 'redux';

// import { isAddingMessageToServer } from './components/messages/messages.reducer';
// import { isFetchingRooms, isAddingRoomToServer, rooms, isAddRoomWindowVisible } from './rooms.reducer';
import { roomsReducer } from './rooms.reducer';
import { userReducer } from './user.reducer';
import { isFetchingMessages, messages, currentMessage, isAddingMessageToServer } from './messages.reducer'
// import { activeUser } from './activeUser.reducer'

const rootReducer = combineReducers({
  isFetchingMessages,
  isAddingMessageToServer,
  messages,
  currentMessage,
  roomsReducer,
  userReducer,
  // isFetchingRooms,
  // isAddingRoomToServer,
  // rooms,
  // activeRoom,
  // isAddRoomWindowVisible, // : isAddRoomWindowVisible  because ES6
  // activeUser,
  // isSignInWindowVisible
})

export default rootReducer;