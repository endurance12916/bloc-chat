import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllMessages, subscribeToMessages, addMessage, updateCurrentMessage } from '../shared/activeRoom.actions';
import Messages from './messages.component';

class MessagesContainer extends Component {

  render() {
    const { messages, currentMessage, isFetchingMessages, addMessage, isAddingMessageToServer, activeUser, activeRoom } = this.props;
    return (
      <Messages messages={messages} currentMessage={currentMessage} updateCurrentMessage={updateCurrentMessage} isFetchingMessages={isFetchingMessages} addMessage={addMessage} isAddingMessageToServer={isAddingMessageToServer} activeRoom={activeRoom} activeUser={activeUser}/>
    )
  }
}

// insert data into the component
// this function accepts state and then returns an object of props
function mapStateToProps(state) {
  return {
    isFetchingMessages: state.isFetchingMessages,
    isAddingMessageToServer: state.isAddingMessageToServer,
    messages: state.messages, // so that -> this.props.messages = state.messages
    currentMessage: state.currentMessage,
    activeRoom: state.activeRoom,
    activeUser: state.activeUser
  }
}

// insert actions into the component
// this function is able to dispatch our action creator with a prop.
function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchAllMessages, subscribeToMessages, addMessage, updateCurrentMessage}, dispatch)
}

// all action creators and all data(states) are now available to the Main component
export default connect(
  mapStateToProps, mapDispatchToProps
)(MessagesContainer);