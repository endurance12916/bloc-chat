import React, { Component } from 'react';
import { Modal, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import './userLogin.css';

class UsersLogin extends Component {

  handleSubmit = (event) => {
      // preventDefault => page doesn't reload when form is submitted
      event.preventDefault();
      let userName = this.userName;
      this.props.signUp(userName.value);
  }

  render() {
    return (
      <div className="modal-container" style={{height: 200}}>
        <Modal
          show={this.props.isSignInWindowVisible}
          onHide={this.props.hideSignInWindow}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title">Set a username</Modal.Title>
          </Modal.Header>
          <Modal.Body>
        <Form className="addUser-form" onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup>
                <FormControl type="text" placeholder="This name will appear when you set messages" inputRef={(input) => this.userName = input}/>
            </FormGroup>
            <Button type="submit" onClick={this.props.hideSignInWindow}>
                Set username
            </Button>
        </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

export default UsersLogin;