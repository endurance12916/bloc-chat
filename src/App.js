import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar.js'
import Login from './login.js'
import AddRoom from './addRoom.js'
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
      room: {},
      messages: [],
      message: {},
      showSignIn: false,
      showAddRoom: false,
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

  addRoom = (name) => {
    const newRoom = {
      id: 'room '+(Object.values(this.state.rooms).length),
      name: name
    }
    firebase.database().ref('rooms/'+newRoom.id).set(newRoom)
    this.setState({room:newRoom})
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

  openSignIn = () => {
    this.setState({ showSignIn: true})
  }

  closeSignIn = () => {
    this.setState({ showSignIn: false})
  }

  openAddRoom = () => {
    this.setState({ showAddRoom: true})
  }

  closeAddRoom = () => {
    this.setState({ showAddRoom: false})
  }

  render() {

    console.log('rendered')
    const allMessages = Object.values(this.state.messages).map((message, i) => {
      return (
        <li key={message.createdAt}>{message.text}</li>
      )
    })

    const allRooms = Object.values(this.state.rooms).map((room, i) => {
      return (
        <li key={room.id}>{room.name}</li>
      )
    })

    return (
      <div className="App">
        <Login showSignIn={this.state.showSignIn} closeSignIn={this.closeSignIn}/>
        <AddRoom addRoom={this.addRoom.bind(this)} showAddRoom={this.state.showAddRoom} closeAddRoom={this.closeAddRoom}/>
        {/* Navbar */}
        <Navbar openSignIn={this.openSignIn}/>
        {/* Content */}
        <Grid fluid>
          <Row className="contents features">
            {/* Select Room section */}
            <Col sm={3} xsHidden className="room-section">
              <Col sm={11} smOffset={1}>
                <h2>Bloc Chat</h2>
                <Button onClick={() => this.openAddRoom()}>New Room</Button>
                <ul className="list-unstyled">{allRooms}</ul> 
              </Col>
            </Col> 
            {/* Message section */}
            <Col sm={9} className="message-section">
              <Col sm={11} smOffset={1}>
                <h2>{this.state.room.name}</h2>
                <div className="message-field">
                  <ul className="list-unstyled messages-body">{allMessages}</ul>
                  <input onChange={this.updateMessage} type="text" placeholder="Message" className="message-box" />
                  <Button onClick={this.submitMessage} className="message-send-button"><i className="glyphicon glyphicon-send"></i></Button>
                </div>
              </Col>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;