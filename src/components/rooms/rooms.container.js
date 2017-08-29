import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { subscribeToRooms, showAddRoomWindow, setActiveRoom } from '../../actions/actionCreators';
import Rooms from './rooms.component';
import _ from 'lodash';

class RoomsContainer extends Component {
  componentWillMount() {
    // this.props.fetchAllRooms();
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
    isFetchingRooms: state.isFetchingRooms,
    rooms: state.rooms,
    activeRoom: state.activeRoom,
  }),
  (dispatch) => bindActionCreators({ subscribeToRooms, showAddRoomWindow, setActiveRoom }, dispatch)
)(RoomsContainer);