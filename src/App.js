import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import { Grid, Row, Col, Button } from 'react-bootstrap'

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
      room: {id:0, name:'Create a Room from the left'},
      messages: [],
      message: '',
    }
  }

  componentDidMount() {
    // const rootRef = firebase.database().ref().child('rooms');
    // const roomRef = rootRef.child("room1");
    // roomRef.on('value', (snapshot) => {
    firebase.database().ref('rooms/').on('value', (snapshot) => {
      const allRooms = snapshot.val();
        if (allRooms !== null) {
          this.setState({
            rooms: allRooms
          });
      }
    })

    // the on() method allows syncing data in real time. To use it, attach it to a Ref -> everytime data changes at the location of rooms, it provides this callback function that returns a new set of data
    firebase.database().ref('messages/').on('value', (snapshot) => {
      const allMessages = snapshot.val();
      if (allMessages != null) {
        this.setState({
          messages: allMessages
        });
      }
    });
  }

  addRoom = (event) => {
    const nextRoom = {
      id: 'Room '+(Object.values(this.state.rooms).length+1),
      name: 'Room '+(Object.values(this.state.rooms).length+1)
    }

    firebase.database().ref('rooms/'+nextRoom.id).set(nextRoom)

    this.setState({room:nextRoom})
  }

  updateMessage = (event) => {
    this.setState({
      message: event.target.value
    })
  }

  submitMessage = (event) => {
    if (this.state.room.name==='Create a Room from the left') {
      alert('Please create a room first!')
    } else {
      const nextMessage = {
        id: 'message '+(Object.values(this.state.messages).length+1),
        text: this.state.message
      }

      firebase.database().ref('messages/'+nextMessage.id).set(nextMessage)
    }
  }

  render() {
    const allMessages = Object.values(this.state.messages).map((message, i) => {
      return (
        <li key={message.id}>{message.text}</li>
      )
    })

    console.log(this.state.rooms)
    const allRooms = Object.values(this.state.rooms).map((room, i) => {
      return (
        <li key={room.id}>{room.name}</li>
      )
    })

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