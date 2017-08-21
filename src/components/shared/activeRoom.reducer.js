export const activeRoom = (state = {}, action) => {
  switch(action.type) {
    case 'SET_ACTIVE_ROOM':
      console.log("reducer - set active room to ", action.room);
      return action.room;
    default:
      return state;
  }
}

export const isFetchingMessages = (state = [], action) => {
  switch (action.type) {
      case 'START_FETCHING_MESSAGES':
        console.log("reducer - isFetchingMessages: true");
        return true;
      case 'FETCH_MESSAGES_FULFILLED':
        console.log("reducer - isFetchingMessages: false");
        return false;
      default:
          return state
  }
}

function createMessage(state = [], action) {
  return {
    username: action.message.username,
    createdAt: action.message.createdAt,
    text: action.message.text
  }
}

export const messages = (state = [], action) => {
  switch(action.type) {
    case 'FETCH_MESSAGES_FULFILLED':
      console.log("reducer - fetch Messages/add Message fulfilled");
      return [...state, createMessage(state, action)];
    default: 
      return state;
  }
}

export const isAddingMessageToServer = (state = [], action) => {
  switch (action.type) {
      case 'START_ADDING_MESSAGE':
        console.log("reducer - isAddingMessageToServer: true");
        return true;
      case 'ADD_MESSAGE_FULFILLED':
        console.log("reducer - isAddingMessageToServer: false");
        return false;
      default:
          return state
  }
}

// this reducer is supposed to be called when I'm typing in messages. but for some reason it's never called..
// the action is called in components/messages/messages.component.js. the action and the state are passed into the component from the messages.container
export const currentMessage = (state = 'default message', action) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_MESSAGE':
      console.log("reducer - is updating current message");
      return action.text;
    default:
      return state
  }
}