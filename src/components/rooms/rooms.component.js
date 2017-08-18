import React, { Component } from 'react';
import { Col, Nav, NavItem, Button } from 'react-bootstrap';
// import ShowAddRoomWindowContainer from '../addRoomWindow/addRoomWindow.container'

class Rooms extends Component {
  render() {
    const allRooms = Object.values(this.props.rooms).map((room, i) => {
      console.log(room) // room=proxy?? What does that mean?
        return (
        // use callback this.switchRoom.bind(this.room.id) instead of calling the function right away this.switchRoom(room.id)
        <NavItem key={room.id} onClick={this.props.switchRoom.bind(room)} className="room-pills">{room.name}</NavItem>
        )
    })
    return (
      <Col sm={3} xsHidden className="room-section">
        <Col sm={11} smOffset={1}>
          <h2>Bloc Chat</h2>
          <Button onClick={this.props.showAddRoomWindow}>New Room</Button>
          <Nav bsStyle="pills" stacked>
            {allRooms}
          </Nav>
        </Col>
      </Col> 
    )
  }
}

export default Rooms;