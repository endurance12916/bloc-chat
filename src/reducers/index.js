import { combineReducers } from 'redux';
import { roomsReducer } from './rooms.reducer';
import userReducer from './user.reducer';
import { messagesReducer } from './messages.reducer'

const rootReducer = combineReducers({
  messagesReducer,
  roomsReducer,
  userReducer,
})

export default rootReducer;