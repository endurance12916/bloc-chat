import { combineReducers } from 'redux';

// import { isAddingMessageToServer } from './components/messages/messages.reducer';
import { isFetchingRooms, isAddingRoomToServer, rooms, isAddRoomWindowVisible } from './components/rooms/rooms.reducer';
import { isSignInWindowVisible } from './components/user/user.reducer';
import { activeRoom, isFetchingMessages, messages, currentMessage, isAddingMessageToServer } from './components/shared/activeRoom.reducer'
import { activeUser } from './components/shared/activeUser.reducer'

const rootReducer = combineReducers({
  isFetchingMessages,
  isAddingMessageToServer,
  messages,
  currentMessage,
  isFetchingRooms,
  isAddingRoomToServer,
  rooms,
  activeRoom,
  isAddRoomWindowVisible, // : isAddRoomWindowVisible  because ES6
  activeUser,
  isSignInWindowVisible
})

export default rootReducer;