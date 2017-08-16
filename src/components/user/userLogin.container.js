import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hideSignInWindow } from './user.actions';
import { signUp } from '../shared/activeUser.actions'
import UserLogin from './userLogin.component';

// need to add users state
class UserLoginContainer extends Component {
  render() {
    const { isSignInWindowVisible } = this.props;
    return (
      <UserLogin isSignInWindowVisible={ isSignInWindowVisible } hideSignInWindow={this.props.hideSignInWindow} />
    )
  }
}

export default connect(
  (state) => ({isSignInWindowVisible: state.isSignInWindowVisible}),
  (dispatch) => bindActionCreators({hideSignInWindow, signUp }, dispatch)
)(UserLoginContainer);