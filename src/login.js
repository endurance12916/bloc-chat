import React, { Component } from 'react';
import { Modal, Form, FormGroup, Checkbox, Col, ControlLabel, FormControl, Button } from 'react-bootstrap'
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="modal-container" style={{height: 200}}>
        <Modal
          show={this.props.showSignIn}
          onHide={this.props.closeSignIn}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.closeSignIn}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default Login;