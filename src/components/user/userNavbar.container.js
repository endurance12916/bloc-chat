import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showSignInWindow, setActiveUser, logOutAction } from '../../actions/actionCreators';
import UserNavbar from './userNavbar.component';
import Cookies from 'js-cookie';

class UserNavbarContainer extends Component {
  componentDidMount() {
    const user = Cookies.get('user')
    if (user) {
      console.log('user', user)
      this.props.setActiveUser(user);
      console.log('active user', this.props.activeUser)
    }
  }

  render() {
    return (
      <UserNavbar {...this.props} />
    )
  }
}

export default connect(
  (state) => ({activeUser: state.userReducer.activeUser}),
  (dispatch) => bindActionCreators({setActiveUser, showSignInWindow, logOutAction}, dispatch)
)(UserNavbarContainer);