// 1. reducer names must match state names
// 2. add Action suffix to all actions to differentiate them 
// 3. for each component, group all relevant files (actionCreators, reducer, component, container(connect), index)
// 4. state tree includes all states. Can copy statetree from client and therefore easy to debug.
// 5. all actions in actionCreators. Don't put them in containers.
// 6. reducers only manage states
// 7. argument action passed into reducers is the action object {type:xxx, property:yyy}. Therefore if no property other than type, need to return true/false instead of action.yyy
// 8. cookie -> serialized into a JSON string, when you retrieve data from cookie, need to parse it //console.log('type', typeof this.state.user) -> user would be a string
// 9. under render(), anything that has HTML can be put here, but no function that calls setState immediately
// 10. onHide is looking for a function
// 11. import { Provider } from 'react-redux'; // Provider provides context - {store: this.props.store} to its children by rendering this.props.children
// 12. add Action suffix to all actions
// 13. use {...this.props} when passing props from containers to components. The this.props refers to all the props passed into the container through the connect function
// 14. regarding defaultState in createStore:
  // if you stick to Redux conventions and return the initial state from reducers when they're called with undefined as the state argument (the easiest way to implement this is to specify the state ES6 default argument value), you're going to have a nice useful behavior for combined reducers. They will prefer the corresponding value in the initialState object you pass to the createStore() function, but if you didn't pass any, or if the corresponding field is not set, the default state argument specified by the reducer is chosen instead. This approach works well because it provides both initialization and hydration of existing data, but lets individual reducers reset their state if their data was not preserved. Of course you can apply this pattern recursively, as you can use combineReducers() on many levels, or even compose reducers manually by calling reducers and giving them the relevant part of the state tree.

  // Normally, just specify the initial state as reducer default argument, and let each reducer manage it for themselves.
  // However in some cases you want to “hydrate” the state with existing data. For example, you might have saved the whole state tree in a localStorage and want to load it from there on startup, or maybe you are rendering on the server, and want to load the initial state you saved on the server from the HTML.
  // In this case, the initialState to createStore() is useful because it lets you optionally hydrate some parts of the tree where you have pre-populated data. In this case, it would “win” to the reducer default state which is usually the behavior you would want. The parts of the state tree that exist in initialState would be used as is, and the missing parts would be retrieved from the reducers. This makes it possible to “restore” some parts of the state, but always re-initialize the others.
// 15. to deploy firebase, run >npm run build and change to "public": "build" in firebase.json
// 16. Provider provides context - {store: this.props.store} to its children by rendering this.props.children