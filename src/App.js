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
      roomNum: 1
    }
  }

  componentDidMount() {
    const rootRef = firebase.database.ref();
    const roomRef = rootRef.child("rooms");
    // the on() method allows syncing data in real time. To use it, attach it to a Ref -> everytime data changes at the location of rooms, it provides this callback function that returns a new set of data
    roomRef.on('value', snap => {
      this.setState({
        roomNum: snap.val()
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Grid fluid>
          {/* Title */}
          <Row className="show-grid title row text-center">
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
                <ul className="list-unstyled">
                  <li>Room1</li>
                  <li>Room2</li>
                  <li>Room3</li>
                </ul> 
                <Button className="pull-left">New Room</Button>
              </Col>
            </Col> 
            {/* Message section */}
            <Col sm={9} className="message-section">
              <Col sm={11} smOffset={1}>
                <h2>Room {this.state.roomNum}</h2>
                <p className="lead">messages</p>
                <i className="glyphicon glyphicon-send"></i>
              </Col>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;