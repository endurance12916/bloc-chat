import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { subscribeToRooms, showAddRoomWindow, setActiveRoom } from '../../actions/actionCreators';
import Rooms from './rooms.component';

class RoomsContainer extends Component {
  componentWillMount() {
    this.props.subscribeToRooms();
  }

  render() {
    return (
      <Rooms {...this.props}/>
    )
  }
}

export default connect(
  (state) => ({
    isFetchingRooms: state.roomsReducer.isFetchingRooms,
    rooms: state.roomsReducer.rooms,
    activeRoom: state.roomsReducer.activeRoom,
  }),
  (dispatch) => bindActionCreators({ subscribeToRooms, showAddRoomWindow, setActiveRoom }, dispatch)
)(RoomsContainer);