import React from 'react';
import { Col, Nav, NavItem } from 'react-bootstrap';

const Rooms = ({
  rooms,
  isFetchingRooms,
  activeRoom,
  subscribeToRooms, 
  showAddRoomWindow, 
  setActiveRoom
}) => {
  const allRooms = Object.values(rooms).map((room, i) => {
      return (
      <NavItem key={room.id} onClick={() => setActiveRoom(room)}>{room.name}</NavItem>
      )
  })
  return (
    <Col sm={3} xsHidden className="room-section">
      <Col sm={11} smOffset={1}>
        <h2>Rooms: </h2>
        <Nav bsStyle="pills" stacked>
          {allRooms}
          <NavItem key="add_room" onClick={showAddRoomWindow} className="add-room-pill"> + Add a New Room</NavItem>
        </Nav>
      </Col>
    </Col> 
  )
}

export default Rooms;