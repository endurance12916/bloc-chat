import { combineReducers } from 'redux';

// import { isAddingMessageToServer } from './components/messages/messages.reducer';
// import { isFetchingRooms, isAddingRoomToServer, rooms, isAddRoomWindowVisible } from './rooms.reducer';
import { roomsReducer } from './rooms.reducer';
import { isSignInWindowVisible } from './user.reducer';
import { activeRoom, isFetchingMessages, messages, currentMessage, isAddingMessageToServer } from './activeRoom.reducer'
import { activeUser } from './activeUser.reducer'

const rootReducer = combineReducers({
  isFetchingMessages,
  isAddingMessageToServer,
  messages,
  currentMessage,
  roomsReducer,
  // isFetchingRooms,
  // isAddingRoomToServer,
  // rooms,
  activeRoom,
  // isAddRoomWindowVisible, // : isAddRoomWindowVisible  because ES6
  activeUser,
  isSignInWindowVisible
})

export default rootReducer;