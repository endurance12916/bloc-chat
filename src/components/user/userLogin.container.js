import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hideSignInWindow } from './user.actions';
import { setActiveUser } from '../shared/activeUser.actions'
import UserLogin from './userLogin.component';

class UserLoginContainer extends Component {
  render() {
    const { setActiveUser, isSignInWindowVisible, hideSignInWindow } = this.props;
    return (
      <UserLogin setActiveUser={setActiveUser} isSignInWindowVisible={isSignInWindowVisible} hideSignInWindow={hideSignInWindow} />
    )
  }
}

export default connect(
  (state) => ({isSignInWindowVisible: state.isSignInWindowVisible}),
  (dispatch) => bindActionCreators({hideSignInWindow, setActiveUser}, dispatch)
)(UserLoginContainer);