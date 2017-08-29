import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { subscribeToMessages, addMessage, updateCurrentMessage, submitMessage } from '../../actions/actionCreators';
import Messages from './messages.component';
import debounce from 'lodash/debounce';

// if container doesn't change any states, you can remove the whole container class and simply change MessagesContainer to Messages in the connect function
class MessagesContainer extends Component {
  render() {
    const updateCurrentMessageDebounce = debounce(this.props.updateCurrentMessage, 200);
    // const { messages, currentMessage, updateCurrentMessage, isFetchingMessages, addMessage, isAddingMessageToServer, activeUser, activeRoom } = this.props;
    return (
      // <Messages messages={messages} currentMessage={currentMessage} updateCurrentMessage={updateCurrentMessage} isFetchingMessages={isFetchingMessages} addMessage={addMessage} isAddingMessageToServer={isAddingMessageToServer} activeRoom={activeRoom} activeUser={activeUser}/>
      <Messages {...this.props} updateCurrentMessage={updateCurrentMessageDebounce} />
    )
  }
}

// insert data into the component
// this function accepts state and then returns an object of props
function mapStateToProps(state) {
  return {
    isFetchingMessages: state.messagesReducer.isFetchingMessages,
    isAddingMessageToServer: state.messagesReducer.isAddingMessageToServer,
    messages: state.messagesReducer.messages, // so that -> this.props.messages = state.messages
    currentMessage: state.messagesReducer.currentMessage,
    activeRoom: state.roomsReducer.activeRoom,
    activeUser: state.userReducer.activeUser
  }
}

// insert actions into the component
// this function is able to dispatch our action creator with a prop.
function mapDispatchToProps(dispatch) {
  return bindActionCreators({subscribeToMessages, addMessage, updateCurrentMessage, submitMessage}, dispatch)
}

// all action creators and all data(states) are now available to the Main component
export default connect(
  mapStateToProps, mapDispatchToProps
)(MessagesContainer);