import { createStore, compose } from 'redux';

import rootReducer from './reducers/index';

// create an object for the default data
const defaultState = {
      rooms: [],
      room: {},
      users: [],
      user: {},
      messages: [],
      message: {},
      showSignIn: false,
      showAddRoom: false,
}

const store = createStore(rootReducer, defaultState);

export default store