// reducer takes in 1. action(what happened) 2. copy of current state

export function messages(state = [], action) {
  switch(action.type) {
    case 'ADD_MESSAGE':
      console.log("reducer - adding message");
      return [...state, {
            userId: action.user.id,
            username: action.user.name,
            createdAt: Date.now(),
            text: action.message
          }]
    default: 
      return state;
  }
}