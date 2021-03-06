import React from 'react';
import { Col, Button } from 'react-bootstrap';

function formatTime(time) {
  let d = new Date(time);
  return (''+d).slice(0,24);
}

// const Example = (props) => {return props}
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
        placeholder="Message" 
        className="message-box" 
        // cannot use ref in const
      />
      &nbsp;
      <Button onClick={()=>submitMessage()}><i className="glyphicon glyphicon-send"></i></Button>
      </div>
    </Col>
  )
}

// class Messages extends Component {
//   // Should I always put debounce function inside of a lifecycle method?
//   componentWillUpdate() {
//     this.debounceUpdateMessage = debounce(this.updateMessage, 200); 
//   }

//   typeMessage = (event) => {
//     event.persist();
//     this.debounceUpdateMessage(event);
//   }

//   updateMessage = (event) => {
//     event.persist();
//     console.log(event.target.value) // this correctly returns the string I typed in
//     updateCurrentMessage(event.target.value) // this function is not working, because the log below always displays the default message, not the message I typed in
//     console.log(currentMessage) 
//   }

//   submitMessage = (event) => {
//     if (_.isEmpty(activeUser)) {
//       return alert('Please sign in first.')
//     } else if (_.isEmpty(activeRoom)) {
//       return alert('Please select or create a room first.')
//     } else {
//       console.log('currentMessage in messages.component', currentMessage)
//       const nextMessage = {
//         username: activeUser.username,
//         createdAt: Date.now(),
//         text: currentMessage
//       }
      
//       addMessage(nextMessage, activeRoom.id);
//       this.messageText.value="";
//     }
//   }

//   formatTime = (time) => {
//     let d = new Date(time);
//     return (''+d).slice(0,24);
//   }

//   render() {

//     const allMessages = Object.values(messages).map((message, i) => {
//       return (
//         <li className="messages-body" key={message.createdAt}>
//           <div className="username">{message.username}</div>
//           <div className="timestamp">{this.formatTime(message.createdAt)}</div>
//           <div className="user-message">{message.text}</div>
//         </li>
//       )
//     })

//     return (
//       <Col sm={9} className="message-section">
//         <h2>{activeRoom.name}</h2>
//         <ul className="list-unstyled">{allMessages}</ul>
//         <div className="message-input-field">
//         <input onChange={this.typeMessage} type="text" placeholder="Message" className="message-box" ref={(input) => this.messageText = input}/>
//         &nbsp;
//         <Button onClick={this.submitMessage}><i className="glyphicon glyphicon-send"></i></Button>
//         </div>
//       </Col>
//     )
//   }
// }

export default Messages;