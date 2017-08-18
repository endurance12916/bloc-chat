import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchRooms, addRoom, showAddRoomWindow, hideAddRoomWindow } from './rooms.actions';
import { switchRoom } from '../shared/activeRoom.actions'
import Rooms from './rooms.component';
import AddRoomWindow from './addRoomWindow.component';
import _ from 'lodash';

class RoomsContainer extends Component {
  componentWillMount() {
    // let { fetchRooms } = this.props;
    this.props.fetchRooms();
    this.props.switchRoom({
        id: 'room 0',
        name: 'Public Room'
      })
  }

  componentDidMount() {
    console.log('isempty', _.isEmpty(this.props.activeRoom)) // this always happens before the first fetch? How to check if it's empty after all the fetchings?
    // if (_.isEmpty(this.props.activeRoom)&&_.isEmpty(this.props.rooms)) {
    //   const defaultRoom = {
    //     id: 'room 0',
    //     name: 'Public Room'
    //   }
    //   this.props.addRoom(defaultRoom);
    //   this.props.switchRoom(defaultRoom);
    // }
  }

  render() {
    const { rooms, switchRoom, showAddRoomWindow, hideAddRoomWindow} = this.props;
    return (
      <Rooms rooms={rooms} switchRoom={switchRoom} showAddRoomWindow={showAddRoomWindow} hideAddRoomWindow={hideAddRoomWindow}/>
    )
  }
}

export const RoomsC = connect(
  (state) => ({
    isFetchingRooms: state.isFetchingRooms,
    rooms: state.rooms, // -> this.props.rooms = state.rooms
    activeRoom: state.activeRoom,
  }),
  (dispatch) => bindActionCreators({showAddRoomWindow, fetchRooms, switchRoom }, dispatch)
)(RoomsContainer);


class AddRoomWindowContainer extends Component {
  render() {
    const { isAddRoomWindowVisible, hideAddRoomWindow, addRoom, switchRoom } = this.props
    return (
      // <AddRoomWindow isAddRoomWindowVisible={this.props.isAddRoomWindowVisible} hideAddRoomWindow={this.props.AddRoomWindow} addRoom={this.props.addRoom}/>
      <AddRoomWindow isAddRoomWindowVisible={isAddRoomWindowVisible} hideAddRoomWindow={hideAddRoomWindow} addRoom={addRoom} switchRoom={switchRoom}/>
    )
  }
}

export const AddRoomWindowC = connect(
  (state) => ({isAddRoomWindowVisible: state.isAddRoomWindowVisible}),
  (dispatch) => bindActionCreators({hideAddRoomWindow, addRoom, switchRoom}, dispatch)
)(AddRoomWindowContainer);