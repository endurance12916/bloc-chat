// every reducer runs when there's an action. need to write logic inside reducers to let them know if they should change a state (use switch statement).
// every reducer will return a discrete property of the state, regardless of how many conditions are inside that reducer. 
// export const isFetchingMessages = (state = [], action) => {
//   switch (action.type) {
//       case 'START_FETCHING_MESSAGES':
//         console.log("reducer - isFetchingMessages: true");
//         return true;
//       case 'FETCH_MESSAGES_FULFILLED':
//         console.log("reducer - isFetchingMessages: false");
//         return false;
//       default:
//           return state
//   }
// }

// export const isAddingMessageToServer = (state = [], action) => {
//   switch (action.type) {
//       case 'START_ADDING_MESSAGE':
//         console.log("reducer - isAddingMessageToServer: true");
//         return true;
//       case 'ADD_MESSAGE_FULFILLED':
//         console.log("reducer - isAddingMessageToServer: false");
//         return false;
//       default:
//           return state
//   }
// }

// function createMessage(state = [], action) {
//   return {
//     userId: action.user.id,
//     username: action.user.name,
//     createdAt: Date.now(),
//     text: action.message
//   }
// }

// export const messages = (state = [], action) => {
//   switch(action.type) {
//     case 'FETCH_MESSAGES_FULFILLED':
//       console.log("reducer - fetch Messages/add Message fulfilled");
//       return [...state, createMessage(state, action)];
//     default: 
//       return state;
//   }
// }

