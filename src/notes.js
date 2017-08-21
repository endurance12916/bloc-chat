// 1. reducer names must match state names
// 2. add Action suffix to all actions to differentiate them 
// 3. for each component, group all relevant files (actionCreators, reducer, component, container(connect), index)
// 4. state tree includes all states. Can copy statetree from client and therefore easy to debug.
// 5. all actions in actionCreators. Don't put them in containers.
// 6. reducers only manage states
// 7. argument action passed into reducers is the action object {type:xxx, property:yyy}. Therefore if no property other than type, need to return true/false instead of action.yyy
// 8. cookie -> serialized into a JSON string, when you retrieve data from cookie, need to parse it //console.log('type', typeof this.state.user) -> user would be a string
// 9. under render(), anything that has HTML can be put here, but no function that calls setState immediately

