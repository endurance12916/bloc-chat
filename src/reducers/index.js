import { combineReducers } from 'redux';

import { isFetchingMessages, messages } from './messages';
import { isFetchingRooms, rooms, showAddRoom } from './rooms';
import { users, showSignIn } from './users';

const rootReducer = combineReducers({
  isFetchingMessages,
  messages,
  isFetchingRooms,
  rooms,
  showAddRoom, // : showAddRoom  because ES6
  users,
  showSignIn
})

export default rootReducer;