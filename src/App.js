import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import { Grid, Row, Col, Button } from 'react-bootstrap'
import _ from 'lodash'

const config = {
    apiKey: "AIzaSyCXeADl350Vv4FALlgr4O4VtWztXWJFw3g",
    authDomain: "bloc-chat-4d62e.firebaseapp.com",
    databaseURL: "https://bloc-chat-4d62e.firebaseio.com",
    projectId: "bloc-chat-4d62e",
    storageBucket: "bloc-chat-4d62e.appspot.com",
    messagingSenderId: "393276418132"
};
firebase.initializeApp(config);

class App extends Component {
  constructor() {
    super();
    this.state = {
      rooms: [],
      // room: {id:'room 0', name:'Public Room'},
      room: {},
      messages: [],
      message: {},
    }
  }

  // 3 setStates in componentDidMount() cause the page to be rendered 3 times at start, is there a better way?
  componentDidMount() {
    console.log('componentDidMount() triggered')
    // if no room selected, go to Public Room and display messages in public room
    if (_.isEmpty(this.state.room)&&_.isEmpty(this.state.rooms)) {
      const publicRoom = {
        id: 'room 0',
        name: 'Public Room'
      }
      
      firebase.database().ref('rooms/'+publicRoom.id).set(publicRoom)

      this.setState({room:publicRoom})
    }

    firebase.database().ref('rooms/').on('value', (snapshot) => {
      const allRooms = snapshot.val();
        if (allRooms !== null) {
          this.setState({
            rooms: allRooms
          });
      }
    })
    // console.log('messages/'+this.state.room.id+'/')
    // the on() method allows syncing data in real time. To use it, attach it to a Ref -> everytime data changes at the location of rooms, it provides this callback function that returns a new set of data
    firebase.database().ref('messages/room 0/').on('value', (snapshot) => {
      const allMessages = snapshot.val();
      if (allMessages != null) {
        this.setState({
          messages: allMessages
        });
      }
    });
  }

  componentWillUpdate = (newProps, newState) => {
    console.log('componentWillUpdate() triggered')
    if (newState.room !== this.state.room) {
      console.log('componentWillUpdate() code executed')
      this.setState({room:newState.room}, () => {
        const roomNum = newState.room.id
        firebase.database().ref('messages/'+roomNum+'/').on('value', (snapshot) => {
          const allMessages = snapshot.val();
          if (allMessages !== null) {
            this.setState({messages: allMessages});
          } else {
            this.setState({messages: []})
          }
        });
      })
    }
  }

  addRoom = (event) => {
    const nextRoom = {
      id: 'room '+(Object.values(this.state.rooms).length),
      name: 'Room '+(Object.values(this.state.rooms).length)
    }

    firebase.database().ref('rooms/'+nextRoom.id).set(nextRoom)

    this.setState({room:nextRoom})
  }

  updateMessage = (event) => {
    // every letter typed into the message box will cause the page to re-render. is there a better method?
    this.setState({
      message: event.target.value
    })
  }

  submitMessage = (event) => {
    const nextMessage = {
      user: 'Me',
      createdAt: Date.now(),
      text: this.state.message
    }

    firebase.database().ref(('messages/'+this.state.room.id)+'/'+nextMessage.createdAt).set(nextMessage)
  }

  render() {
    console.log('rendered')
    // console.log('this.state.messages: ', this.state.messages)
    const allMessages = Object.values(this.state.messages).map((message, i) => {
      return (
        <li key={message.createdAt}>{message.text}</li>
      )
    })
    // console.log('all messages: ', allMessages)

    const allRooms = Object.values(this.state.rooms).map((room, i) => {
      return (
        <li key={room.id}>{room.name}</li>
      )
    })
    // console.log('all rooms: ', allRooms)

    return (
      <div className="App">
        <Grid fluid>
          {/* Title */}
          <Row className="title row text-center">
            <Col sm={12}>
              <h1>Bloc Chat App</h1>
            </Col>
          </Row>
          {/* Content */}
          <Row className="contents features">
            {/* Select Room section */}
            <Col sm={3} xsHidden className="room-section">
              <Col sm={11} smOffset={1}>
                <h2>Bloc Chat</h2>
                <ul className="list-unstyled">{allRooms}</ul> 
                <Button onClick={this.addRoom}>New Room</Button>
              </Col>
            </Col> 
            {/* Message section */}
            <Col sm={9} className="message-section">
              <Col sm={11} smOffset={1}>
                <h2>{this.state.room.name}</h2>
                <ul className="list-unstyled">{allMessages}</ul>
                <input onChange={this.updateMessage} type="text" placeholder="Message" />
                <Button onClick={this.submitMessage}><i className="glyphicon glyphicon-send"></i></Button>
              </Col>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;