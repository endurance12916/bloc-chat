import React, { Component } from 'react';
import './App.css';
import UserNavbarContainer from './user/userNavbar.container';
import UserLoginContainer from './user/userLogin.container';
import { RoomsC, AddRoomWindowC } from './rooms/rooms.container.js';
import MessagesContainer from './messages/messages.container';
import * as firebase from 'firebase';
import { Grid, Row } from 'react-bootstrap';

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
  render() {
    return (
      <div className="App">
        <UserLoginContainer />
        <AddRoomWindowC />
        <UserNavbarContainer />
        <Grid fluid>
          <Row className="contents features">
            <RoomsC />
            <MessagesContainer />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;