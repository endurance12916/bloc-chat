// actions are objects

// Messages
export function addMessage(userId, username, text) {
  return {
    type: 'ADD_MESSAGE', // what happened
    userId,  // what needs to change
    username,
    text
  };
}

// Rooms
export function addRoom(id, name) {
  return {
    type: 'ADD_ROOM',
    id,
    name
  };
}

export function switchRoom(room) {
  return {
    type: 'SWITCH_ROOM',
    room
  };
}

export function showAddRoom() {
  return {
    type: 'SHOW_ADD_ROOM'
  };
}

export function hideAddRoom() {
  return {
    type: 'HIDE_ADD_ROOM'
  };
}

// Users
export function signUp(id, name) {
  return {
    type: 'SIGN_UP',
    id,
    name
  };
}

export function showSignIn() {
  return {
    type: 'SHOW_SIGN_IN'
  };
}

export function hideSignIn() {
  return {
    type: 'HIDE_SIGN_IN'
  };
}