import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hideSignInWindow, setActiveUser } from '../../actions/actionCreators'
import UserLogin from './userLogin.component';

class UserLoginContainer extends Component {
  render() {
    // const { setActiveUser, isSignInWindowVisible, hideSignInWindow } = this.props;
    return (
      // <UserLogin setActiveUser={setActiveUser} isSignInWindowVisible={isSignInWindowVisible} hideSignInWindow={hideSignInWindow} />
      <UserLogin {...this.props} />
    )
  }
}

export default connect(
  (state) => ({isSignInWindowVisible: state.isSignInWindowVisible}),
  (dispatch) => bindActionCreators({hideSignInWindow, setActiveUser}, dispatch)
)(UserLoginContainer);