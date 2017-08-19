import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

// create an object for the default data
const defaultState = {
      isFetchingRooms: false,
      isAddingRoomToServer: false,
      rooms: {},
      activeRoom: {},
      isAddRoomWindowVisible: false,
      isFetchingMessages: false,
      messages: [],
      activeUser: {},
      isSignInWindowVisible: false,
}

const store = createStore(rootReducer, defaultState, applyMiddleware(thunk));

export default store