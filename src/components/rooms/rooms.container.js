import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addRoom, subscribeToRooms, showAddRoomWindow, hideAddRoomWindow } from './rooms.actions';
import { setActiveRoom } from '../shared/activeRoom.actions'
import Rooms from './rooms.component';
import AddRoomWindow from './addRoomWindow.component';
import _ from 'lodash';

class RoomsContainer extends Component {
  componentWillMount() {
    // this.props.fetchAllRooms();
    this.props.subscribeToRooms();
    // console.log('isempty in componentWillMount', _.isEmpty(this.props.rooms))
    // this.props.setActiveRoom({
    //     id: 'room 0',
    //     name: 'Public Room'
    //   })
  }

  componentDidMount() {
    console.log('isempty in componentDidMount', _.isEmpty(this.props.rooms)) // this always happens before the first fetch? How to check if it's empty after all the fetchings?
    // console.log('rooms', this.props.rooms)
    // if (_.isEmpty(this.props.activeRoom)&&_.isEmpty(this.props.rooms)) {
    //   const defaultRoom = {
    //     id: 'room 0',
    //     name: 'Public Room'
    //   }
    //   this.props.addRoom(defaultRoom);
    //   this.props.setActiveRoom(defaultRoom);
    // }
  }

  render() {
    const { rooms, subscribeToRooms, setActiveRoom, showAddRoomWindow, hideAddRoomWindow} = this.props;
    return (
      <Rooms rooms={rooms} subscribeToRooms={subscribeToRooms} setActiveRoom={setActiveRoom} showAddRoomWindow={showAddRoomWindow} hideAddRoomWindow={hideAddRoomWindow}/>
    )
  }
}

export const RoomsC = connect(
  (state) => ({
    isFetchingRooms: state.isFetchingRooms,
    rooms: state.rooms,
    activeRoom: state.activeRoom,
  }),
  (dispatch) => bindActionCreators({subscribeToRooms, showAddRoomWindow, setActiveRoom }, dispatch)
)(RoomsContainer);


class AddRoomWindowContainer extends Component {
  render() {
    const { rooms, isAddRoomWindowVisible, hideAddRoomWindow, addRoom, setActiveRoom } = this.props
    return (
      <AddRoomWindow rooms={rooms} isAddRoomWindowVisible={isAddRoomWindowVisible} hideAddRoomWindow={hideAddRoomWindow} addRoom={addRoom} setActiveRoom={setActiveRoom}/>
    )
  }
}

export const AddRoomWindowC = connect(
  (state) => ({rooms: state.rooms, isAddRoomWindowVisible: state.isAddRoomWindowVisible}),
  (dispatch) => bindActionCreators({hideAddRoomWindow, addRoom, setActiveRoom}, dispatch)
)(AddRoomWindowContainer);