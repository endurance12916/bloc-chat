import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar.js'
import Login from './login.js'
import AddRoom from './addRoom.js'
import * as firebase from 'firebase';
import { Grid, Row, Col, Button, Nav, NavItem } from 'react-bootstrap';
import Cookies from 'js-cookie'
import _ from 'lodash';

const config = {
    apiKey: "AIzaSyCXeADl350Vv4FALlgr4O4VtWztXWJFw3g",
    authDomain: "bloc-chat-4d62e.firebaseapp.com",
    databaseURL: "https://bloc-chat-4d62e.firebaseio.com",
    projectId: "bloc-chat-4d62e",
    storageBucket: "bloc-chat-4d62e.appspot.com",
    messagingSenderId: "393276418132"
};
firebase.initializeApp(config);

function getUserFromCookies(user) {
  return (previousState, currentProps) => {
    return {...previousState, user: user};
  };
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      rooms: [],
      room: {},
      users: [],
      user: {},
      messages: [],
      message: {},
      showSignIn: false,
      showAddRoom: false,
    }
  }

  // 3 setStates in componentDidMount() cause the page to be rendered 3 times at start, is there a better way?
  componentDidMount() {
    // if no room selected, go to Public Room and display messages in public room
    if (_.isEmpty(this.state.room)&&_.isEmpty(this.state.rooms)) {
      const publicRoom = {
        id: 'room 0',
        name: 'Public Room'
      }
      
      firebase.database().ref('rooms/'+publicRoom.id).set(publicRoom)
      let roomRef = firebase.database().ref('rooms/'+publicRoom.id)

      roomRef.on("value", function(snapshot) {
        this.setState({room:snapshot.val()})
      }.bind(this), function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    }

    console.log('Cookie', Cookies.get('user'));

    // this.setState(getUserFromCookies('user'));  <-- this setState causes this.state.user='user'

    // this.getUserFromCookies(user)
    this.setState({user: Cookies.get('user')});
    console.log('user', this.state.user.name);

    if (_.isEmpty(this.state.user)) {
      this.setState({showSignIn: true})
    }

    firebase.database().ref('rooms/').on('value', (snapshot) => {
      const allRooms = snapshot.val();
      if (allRooms !== null) {
        this.setState({rooms: allRooms});
      }
    })

    // the on() method allows syncing data in real time. To use it, attach it to a Ref -> everytime data changes at the location of rooms, it provides this callback function that returns a new set of data
    firebase.database().ref('messages/room 0/').on('value', (snapshot) => {
      const allMessages = snapshot.val();
      if (allMessages != null) {
        this.setState({messages: allMessages});
      }
    });
  }

  componentWillUpdate = (newProps, newState) => {
    console.log('componentWillUpdate() triggered')
    if (newState.room !== this.state.room) {
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

  addUser = (name) => {
    const newUser = {
      id: 'user '+(Object.values(this.state.users).length),
      name: name
    }
    firebase.database().ref('users/'+newUser.id).set(newUser)
    this.setState({user:newUser})
    Cookies.set('user', newUser);
  }

  updateMessage = (event) => {
    event.persist();
    // if message submitted before 0.5sec, it wouldn't register... is there a way to fix it?
    const debounceMessage = _.debounce(()=>this.setState({
      message: event.target.value
    }),500)
    debounceMessage();
  }
  // after submitting a message, the messagebox will not automatically clear itself. How to fix it?
  submitMessage = (event) => {
    if (_.isEmpty(this.state.user)) {
      return alert('Please sign in first!')
    } else {
      const nextMessage = {
        userId: this.state.user.id,
        username: this.state.user.name,
        createdAt: Date.now(),
        text: this.state.message
      }
      
      firebase.database().ref(('messages/'+this.state.room.id)+'/'+nextMessage.createdAt).set(nextMessage)
    }
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

  switchRoom = (key) => {
    let roomRef = firebase.database().ref('rooms/'+key)
    roomRef.on("value", function(snapshot) {
      this.setState({room:snapshot.val()})
    }.bind(this), function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }
  
  formatTime = (time) => {
    let d = new Date(time);
    return (''+d).slice(0,24);
  }

  render() {
    // anything that has HTML can be put here, but no function that calls setState immediately

    console.log('rendered')
    console.log('this.state.user', this.state.user)

    const allMessages = Object.values(this.state.messages).map((message, i) => {
      return (
        <li className="messages-body" key={message.createdAt}>
          <div className="username">{message.username}</div>
          <div className="timestamp">{this.formatTime(message.createdAt)}</div>
          <div className="user-message">{message.text}</div>
        </li>
      )
    })

    const allRooms = Object.values(this.state.rooms).map((room, i) => {
      return (
        // use callback this.switchRoom.bind(this.room.id) instead of calling the function right away this.switchRoom(room.id)
          <NavItem eventKey={room.id} onClick={this.switchRoom.bind(this,room.id)} className="room-pills">{room.name}</NavItem>
      )
    })

    return (
      <div className="App">
        <Login addUser={this.addUser} showSignIn={this.state.showSignIn} closeSignIn={this.closeSignIn}/>
        <AddRoom addRoom={this.addRoom} showAddRoom={this.state.showAddRoom} closeAddRoom={this.closeAddRoom}/>
        {/* Navbar */}
        <Navbar openSignIn={this.openSignIn} user={this.state.user}/>
        {/* Content */}
        <Grid fluid>
          <Row className="contents features">
            {/* Select Room section */}
            <Col sm={3} xsHidden className="room-section">
              <Col sm={11} smOffset={1}>
                <h2>Bloc Chat</h2>
                <Button onClick={() => this.openAddRoom()}>New Room</Button>
                <Nav bsStyle="pills" stacked>
                  {allRooms}
                </Nav>
              </Col>
            </Col> 
            {/* Message section */}
            <Col sm={9} className="message-section">
                <h2>{this.state.room.name}</h2>
                <ul className="list-unstyled">{allMessages}</ul>
                <div className="message-input-field">
                  <input onChange={this.updateMessage} type="text" placeholder="Message" className="message-box" />
                  &nbsp;
                  <Button onClick={this.submitMessage}><i className="glyphicon glyphicon-send"></i></Button>
                </div>
              </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;