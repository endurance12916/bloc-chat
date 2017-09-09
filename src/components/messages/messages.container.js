import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { subscribeToMessages, addMessage, updateCurrentMessage, submitMessage } from '../../actions/actionCreators';
import Messages from './messages.component';
import debounce from 'lodash/debounce';

class MessagesContainer extends Component {
  render() {
    const updateCurrentMessageDebounce = debounce(this.props.updateCurrentMessage, 200);
    return (
      <Messages {...this.props} updateCurrentMessage={updateCurrentMessageDebounce} />
    )
  }
}

function mapStateToProps(state) {
  return {
    isFetchingMessages: state.messagesReducer.isFetchingMessages,
    isAddingMessageToServer: state.messagesReducer.isAddingMessageToServer,
    messages: state.messagesReducer.messages, 
    currentMessage: state.messagesReducer.currentMessage,
    activeRoom: state.roomsReducer.activeRoom,
    activeUser: state.userReducer.activeUser
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({subscribeToMessages, addMessage, updateCurrentMessage, submitMessage}, dispatch)
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(MessagesContainer);