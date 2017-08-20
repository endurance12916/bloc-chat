import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showSignInWindow } from './user.actions';
import { setActiveUser } from '../shared/activeUser.actions'
import UserNavbar from './userNavbar.component';
import Cookies from 'js-cookie';

// need to add users state
class UserNavbarContainer extends Component {
  componentDidMount() {
    const user = Cookies.get('user')
    setActiveUser(
      user ? user : undefined
    )
    console.log('user', user)
  }

  render() {
    const { activeUser, showSignInWindow } = this.props;
    return (
      <UserNavbar activeUser={activeUser} showSignInWindow={showSignInWindow} />
    )
  }
}

export default connect(
  (state) => ({activeUser: state.activeUser}),
  (dispatch) => bindActionCreators({showSignInWindow}, dispatch)
)(UserNavbarContainer);