import React, { Component } from 'react';
import './Main.css';
import UserNavbar from './user/userNavbar.component';
import UserLoginContainer from './user/userLogin.container';
// import AddRoomWindowContainer from './addRoomWindow/addRoomWindow.container';
import { RoomsC, AddRoomWindowC } from './rooms/rooms.container.js';
import MessagesContainer from './messages/messages.container';
import * as firebase from 'firebase';
import { Grid, Row } from 'react-bootstrap';
import Cookies from 'js-cookie';

const config = {
    apiKey: "AIzaSyCXeADl350Vv4FALlgr4O4VtWztXWJFw3g",
    authDomain: "bloc-chat-4d62e.firebaseapp.com",
    databaseURL: "https://bloc-chat-4d62e.firebaseio.com",
    projectId: "bloc-chat-4d62e",
    storageBucket: "bloc-chat-4d62e.appspot.com",
    messagingSenderId: "393276418132"
};
firebase.initializeApp(config);

class Main extends Component {
  constructor() {
    super();
    this.state = {
      rooms: [],
      room: {},
      users: [],
      user: {},
      messages: [],
      // isSignInWindowVisible: false,
      // showAddRoom: false,
    }
  }
  // this component now only has setState methods, all else have been moved to other respective components. Is it ideal now?

  // 3 setStates in componentDidMount() cause the page to be rendered 3 times at start, is there a better way?

  // page renders 5 times at start now... should I queue them up?
  componentDidMount() {
    // if no room selected, go to Public Room and display messages in public room
    // if (_.isEmpty(this.state.room)&&_.isEmpty(this.state.rooms)) {
    //   const publicRoom = {
    //     id: 'room 0',
    //     name: 'Public Room'
    //   }
      
    //   firebase.database().ref('rooms/'+publicRoom.id).set(publicRoom)
    //   let roomRef = firebase.database().ref('rooms/'+publicRoom.id)

    //   roomRef.on("value", function(snapshot) {
    //     this.setState({room:snapshot.val()})
    //   }.bind(this), function (errorObject) {
    //     console.log("The read failed: " + errorObject.code);
    //   });
    // }

    // this.props.fetchRooms();
    // this.props.fetchMessages(this.props.room.id) // make sure this is expressed in state tree (rename to active room)

    const user = Cookies.get('user');
    this.setState({ 
      user: user ? JSON.parse(user) : undefined,
      isSignInWindowVisible: !user
    });

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
    // this.props.addRoom(newRoom)
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

  // openSignIn = () => {
  //   this.setState({ isSignInWindowVisible: true})
  // }

  // closeSignIn = () => {
  //   this.setState({ isSignInWindowVisible: false})
  // }

  // openAddRoom = () => {
  //   this.setState({ showAddRoom: true})
  // }

  // closeAddRoom = () => {
  //   this.setState({ showAddRoom: false})
  // }

  switchRoom = (key) => {
    let roomRef = firebase.database().ref('rooms/'+key)
    roomRef.on("value", function(snapshot) {
      this.setState({room:snapshot.val()})
    }.bind(this), function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  render() {
    // cookie -> serialized into a JSON string, when you retrieve data from cookie, need to parse it
    // console.log('type', typeof this.state.user) -> user would be a string
    // anything that has HTML can be put here, but no function that calls setState immediately
    return (
      // original code (w/o redux)
      // <div className="App">
      //   <Login addUser={this.addUser} isSignInWindowVisible={this.state.isSignInWindowVisible} closeSignIn={this.closeSignIn}/>
      //   <AddRoom addRoom={this.addRoom} showAddRoom={this.state.showAddRoom} closeAddRoom={this.closeAddRoom}/>
      //   <Navbar openSignIn={this.openSignIn} user={this.state.user}/>
      //   <Grid fluid>
      //     <Row className="contents features">
      //       <Rooms rooms={this.state.rooms} switchRoom={this.switchRoom} openAddRoom={this.openAddRoom} />
      //       <Messages user={this.state.user} room={this.state.room} messages={this.state.messages} />
      //     </Row>
      //   </Grid>
      // </div>
      <div className="App">
        {/* <UserLoginContainer addUser={this.addUser} isSignInWindowVisible={this.props.isSignInWindowVisible} hideSignIn={this.props.hideSignIn}/> */}
        <UserLoginContainer />
        {/* <AddRoomWindowContainer addRoom={this.addRoom} showAddRoom={this.props.showAddRoom} hideAddRoomWindow={this.props.hideAddRoomWindow}/> */}
        <AddRoomWindowC />
        {/* <Navbar isSignInWindowVisible={this.props.isSignInWindowVisible} user={this.state.user}/> */}
        <UserNavbar />
        <Grid fluid>
          <Row className="contents features">
            {/* <Rooms rooms={this.props.rooms} switchRoom={this.props.switchRoom} showAddRoomWindow={this.props.showAddRoomWindow} /> */}
            <RoomsC />
            {/* <MessagesContainer user={this.state.user} room={this.state.room} messages={this.state.messages} /> */}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Main;