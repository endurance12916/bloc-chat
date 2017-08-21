// reducer takes in 1. action(what happened) 2. copy of current state
// action is the action object from the actionCreators -> {type: 'xxx', a: yyy}

import * as firebase from 'firebase';

export const isFetchingMessages = (state = [], action) => {
    switch (action.type) {
        case 'START_FETCHING_MESSAGES':
          console.log("reducer - start fetching messages");
          return Object.assign({}, state, {
              isFetchingMessages: true
          });
        case 'RECEIVED_MESSAGES':
          console.log("reducer - receiving messages");
          return Object.assign({}, state, {
              isFetchingMessages: false,
          });
        default:
            return state
    }
}

export const message = (state, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
          return {
            userId: action.user.id,
            username: action.user.name,
            createdAt: Date.now(),
            text: action.message
          }
        case 'SEND_MESSAGE':
          let msg = {
            userId: action.user.id,
            username: action.user.name,
            createdAt: Date.now(),
            text: action.message
          };
          const newMsgRef = firebase.database()
                                    .ref(('messages/'+this.props.room.id)+'/'+msg.createdAt) // how to get room.id?
                                    .push();
          msg.id = newMsgRef.key;
          newMsgRef.set(msg);
          return msg;
        default:
          return state
    }
}

export const messages = (state = [], action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
          console.log("reducer - adding message");
          if (state.map(m => m.userId).includes(action.user.id)) {
              return state;
          }else{
              return [
              ...state,
              message(undefined, action)
              ]
          }
        case 'SEND_MESSAGE':
          console.log("reducer - sending message");
          return [
              ...state,
              message(undefined, action)
          ]
        default:
          return state
    }
};
  
// export const messages = (state = [], action) => {
//   switch(action.type) {
//     case 'ADD_MESSAGE':
//       console.log("reducer - adding message");
//       return [...state, {
//         userId: action.user.id,
//         username: action.user.name,
//         createdAt: Date.now(),
//         text: action.message
//       }]
//     default: 
//       return state;
//   }
// }

