import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './messages.actions';
import Messages from './messages.component';

class MessagesContainer extends Component {
  componentWillMount() {
    let { fetchMessages } = this.props;
    fetchMessages();
  }
  render() {
    const { messages } = this.props;
    return (
      <Messages messages={ messages } />
    )
  }
}

// insert data into the component
// this function accepts state and then returns an object of props
function mapStateToProps(state) {
  console.log('state.activeRoom in message',state.activeRoom)
  return {
    isFetchingMessages: state.isFetchingMessages,
    messages: state.messages, // -> this.props.messages = state.messages
    activeRoom: state.activeRoom
  }
}

// insert actions into the component
// this function is able to dispatch our action creator with a prop.
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

// all action creators and all data(states) are now available to the Main component
export default connect(
  mapStateToProps, mapDispatchToProps
)(MessagesContainer);