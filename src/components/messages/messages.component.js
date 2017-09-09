import React from 'react';
import { Col, Button } from 'react-bootstrap';

function formatTime(time) {
  let d = new Date(time);
  return (''+d).slice(0,24);
}

const Messages = ({
  updateCurrentMessage,
  currentMessage,
  activeRoom,
  messages,
  submitMessage,
}) => {
  const allMessages = Object.values(messages).map((message, i) => {
    return (
      <li className="messages-body" key={message.createdAt}>
        <div className="username">{message.username}</div>
        <div className="timestamp">{formatTime(message.createdAt)}</div>
        <div className="user-message">{message.text}</div>
      </li>
    )
  })

  return (
    <Col sm={9} className="message-section">
      <h2>{activeRoom.name}</h2>
      <ul className="list-unstyled">{allMessages}</ul>
      <div className="message-input-field">
      <input 
        onChange={(e)=>updateCurrentMessage(e.target.value)} 
        type="text" 
        placeholder="Type your message" 
        className="message-box" 
      />
      &nbsp;
      <Button onClick={()=>submitMessage()}><i className="glyphicon glyphicon-send"></i></Button>
      </div>
    </Col>
  )
}

export default Messages;