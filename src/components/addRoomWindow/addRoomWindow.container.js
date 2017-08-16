// import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as actionCreators from '../shared/addRoomWindow.actions';
// import { addRoom } from '../rooms/rooms.actions'
// import AddRoomWindow from './addRoomWindow.component';

// class AddRoomWindowContainer extends Component {
//   render() {
//     // const { isAddRoomWindowVisible } = this.props;
//     return (
//       <AddRoomWindow isAddRoomWindowVisible={this.props.isAddRoomWindowVisible} showAddRoomWindow={this.props.showAddRoomWindow} hideAddRoomWindow={this.props.AddRoomWindow} addRoom={this.props.addRoom}/>
//     )
//   }
// }

// export default connect(
//   (state) => ({isAddRoomWindowVisible: state.isAddRoomWindowVisible}),
//   (dispatch) => bindActionCreators(actionCreators, dispatch)
// )(AddRoomWindowContainer);