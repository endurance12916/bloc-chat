import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

// create an object for the default data
// if you stick to Redux conventions and return the initial state from reducers when they're called with undefined as the state argument (the easiest way to implement this is to specify the state ES6 default argument value), you're going to have a nice useful behavior for combined reducers. They will prefer the corresponding value in the initialState object you pass to the createStore() function, but if you didn't pass any, or if the corresponding field is not set, the default state argument specified by the reducer is chosen instead. This approach works well because it provides both initialization and hydration of existing data, but lets individual reducers reset their state if their data was not preserved. Of course you can apply this pattern recursively, as you can use combineReducers() on many levels, or even compose reducers manually by calling reducers and giving them the relevant part of the state tree.

// Normally, just specify the initial state as reducer default argument, and let each reducer manage it for themselves.
// However in some cases you want to “hydrate” the state with existing data. For example, you might have saved the whole state tree in a localStorage and want to load it from there on startup, or maybe you are rendering on the server, and want to load the initial state you saved on the server from the HTML.
// In this case, the initialState to createStore() is useful because it lets you optionally hydrate some parts of the tree where you have pre-populated data. In this case, it would “win” to the reducer default state which is usually the behavior you would want. The parts of the state tree that exist in initialState would be used as is, and the missing parts would be retrieved from the reducers. This makes it possible to “restore” some parts of the state, but always re-initialize the others.

const defaultState = {
      roomsReducer: {
        isFetchingRooms: false,
        isAddingRoomToServer: false,
        rooms: [],
        isAddRoomWindowVisible: false,
        activeRoom: {}, // would return error if this is not here, but I do have it as initial state in the reducer though. Why the error?
      },
      // isFetchingRooms: false,
      // isAddingRoomToServer: false,
      // rooms: {},
      // activeRoom: {},
      // isAddRoomWindowVisible: false,
      messagesReducer: {
        isFetchingMessages: false,
        isAddingMessageToServer: false,
        messages: [],
        currentMessage: 'default message',
      },
      userReducer: {
        activeUser: {},
        isSignInWindowVisible: false,
      }
      // activeUser: {},
      // isSignInWindowVisible: false,
}

const store = createStore(rootReducer, defaultState, applyMiddleware(thunk));

export default store