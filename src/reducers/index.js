import { combineReducers } from 'redux';

import { meta, messages } from './messages';
import { rooms, showAddRoom } from './rooms';
import { users, showSignIn } from './users';

const rootReducer = combineReducers({
  meta,
  messages,
  rooms,
  showAddRoom,
  users,
  showSignIn
})

export default rootReducer;