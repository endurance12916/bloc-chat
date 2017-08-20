import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllRooms, addRoom, subscribeToRooms, showAddRoomWindow, hideAddRoomWindow } from './rooms.actions';
import { setActiveRoomAction } from '../shared/activeRoom.actions'
import Rooms from './rooms.component';
import AddRoomWindow from './addRoomWindow.component';
import _ from 'lodash';

class RoomsContainer extends Component {
  componentWillMount() {
    // let { fetchAllRooms } = this.props;
    this.props.fetchAllRooms();
    this.props.subscribeToRooms();
    console.log('isempty in componentWillMount', _.isEmpty(this.props.rooms))
    console.log('rooms', this.props.rooms)
    // this.props.setActiveRoomAction({
    //     id: 'room 0',
    //     name: 'Public Room'
    //   })
  }

  componentDidMount() {
    console.log('isempty in componentDidMount', _.isEmpty(this.props.rooms)) // this always happens before the first fetch? How to check if it's empty after all the fetchings?
    console.log('rooms', this.props.rooms)
    // if (_.isEmpty(this.props.activeRoom)&&_.isEmpty(this.props.rooms)) {
    //   const defaultRoom = {
    //     id: 'room 0',
    //     name: 'Public Room'
    //   }
    //   this.props.addRoom(defaultRoom);
    //   this.props.setActiveRoomAction(defaultRoom);
    // }
  }

  render() {
    const { rooms, subscribeToRooms, setActiveRoomAction, showAddRoomWindow, hideAddRoomWindow} = this.props;
    return (
      <Rooms rooms={rooms} subscribeToRooms={subscribeToRooms} setActiveRoomAction={setActiveRoomAction} showAddRoomWindow={showAddRoomWindow} hideAddRoomWindow={hideAddRoomWindow}/>
    )
  }
}

export const RoomsC = connect(
  (state) => ({
    isFetchingRooms: state.isFetchingRooms,
    rooms: state.rooms, // -> this.props.rooms = state.rooms
    activeRoom: state.activeRoom,
  }),
  (dispatch) => bindActionCreators({subscribeToRooms, showAddRoomWindow, fetchAllRooms, setActiveRoomAction }, dispatch)
)(RoomsContainer);


class AddRoomWindowContainer extends Component {
  render() {
    const { rooms, isAddRoomWindowVisible, hideAddRoomWindow, addRoom, setActiveRoomAction } = this.props
    return (
      // <AddRoomWindow isAddRoomWindowVisible={this.props.isAddRoomWindowVisible} hideAddRoomWindow={this.props.AddRoomWindow} addRoom={this.props.addRoom}/>
      <AddRoomWindow rooms={rooms} isAddRoomWindowVisible={isAddRoomWindowVisible} hideAddRoomWindow={hideAddRoomWindow} addRoom={addRoom} setActiveRoomAction={setActiveRoomAction}/>
    )
  }
}

export const AddRoomWindowC = connect(
  (state) => ({rooms: state.rooms, isAddRoomWindowVisible: state.isAddRoomWindowVisible}),
  (dispatch) => bindActionCreators({hideAddRoomWindow, addRoom, setActiveRoomAction}, dispatch)
)(AddRoomWindowContainer);