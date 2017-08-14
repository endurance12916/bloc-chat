import { combineReducers } from 'redux';

import { isFetching, messages } from './messages';
import { rooms, showAddRoom } from './rooms';
import { users, showSignIn } from './users';

const rootReducer = combineReducers({
  isFetching,
  messages,
  rooms,
  showAddRoom,
  users,
  showSignIn
})

export default rootReducer;