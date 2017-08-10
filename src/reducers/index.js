import { combineReducers } from 'redux';

import { addMessages } from './messages';
import { rooms } from './rooms';
import { users } from './users';

const rootReducer = combineReducers({addMessages, rooms, users})

export default rootReducer;