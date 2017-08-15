import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

// create an object for the default data
const defaultState = {
      // rooms: [],
      // room: {},
      // users: [],
      // user: {},
      // messages: [],
      // message: {},
      // showSignIn: false,
      // showAddRoom: false,
      isFetchingMessages: false,
      isFetchingRooms: false,
      rooms: {},
      showAddRoom: false,
      messages: [],
      users: {},
      showSignIn: false,
}

const store = createStore(rootReducer, defaultState, applyMiddleware(thunk));

export default store