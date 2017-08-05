import React, { Component } from 'react';
import { Col, Button } from 'react-bootstrap';
import _ from 'lodash';
import debounce from 'lodash/debounce';
import * as firebase from 'firebase';

class Messages extends Component {
  constructor() {
    super();
    this.state = {
      message: {}
    }
  }

  // should this be componentDidMount or componentWillUpdate? and why can I not put this function outside of a lifecycle method?
  componentWillUpdate() {
    this.debounceUpdateMessage = debounce(this.updateMessage, 200); 
  }

  typeMessage = (event) => {
    event.persist();
    this.debounceUpdateMessage(event);
    // this.updateMessage(event);
  }

  // debounceUpdateMessage = debounce(this.updateMessage, 200); 

  updateMessage = (event) => {
    event.persist();
    this.setState({message: event.target.value})
  }

  submitMessage = (event) => {
    if (_.isEmpty(this.props.user)) {
      return alert('Please sign in first!')
    } else {
      const nextMessage = {
        userId: this.props.user.id,
        username: this.props.user.name,
        createdAt: Date.now(),
        text: this.state.message
      }
      
      firebase.database().ref(('messages/'+this.props.room.id)+'/'+nextMessage.createdAt).set(nextMessage)
    }
  }

  formatTime = (time) => {
    let d = new Date(time);
    return (''+d).slice(0,24);
  }

  render() {

    const allMessages = Object.values(this.props.messages).map((message, i) => {
      return (
        <li className="messages-body" key={message.createdAt}>
          <div className="username">{message.username}</div>
          <div className="timestamp">{this.formatTime(message.createdAt)}</div>
          <div className="user-message">{message.text}</div>
        </li>
      )
    })

    return (
      <Col sm={9} className="message-section">
        <h2>{this.props.room.name}</h2>
        <ul className="list-unstyled">{allMessages}</ul>
        <div className="message-input-field">
        {/* give this a ref and add onMouseUp to Button to set ref to '' */}
        <input onChange={this.typeMessage} type="text" placeholder="Message" className="message-box" />
        &nbsp;
        <Button onClick={this.submitMessage}><i className="glyphicon glyphicon-send"></i></Button>
        </div>
      </Col>
    )
  }
}

export default Messages;