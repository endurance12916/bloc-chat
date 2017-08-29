import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

// create an object for the default data
const defaultState = {
      isFetchingRooms: false,
      isAddingRoomToServer: false,
      rooms: {},
      activeRoom: {},
      isAddRoomWindowVisible: false,
      isFetchingMessages: false,
      isAddingMessageToServer: false,
      messages: [],
      currentMessage: 'default message',
      activeUser: {},
      isSignInWindowVisible: false,
}

const store = createStore(rootReducer, defaultState, applyMiddleware(thunk));

export default store