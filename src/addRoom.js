import React, { Component } from 'react';
import { Modal, Form, FormGroup, FormControl, Button } from 'react-bootstrap'

class AddRoom extends Component {

    handleSubmit = (event) => {
        // preventDefault => page doesn't reload when form is submitted
        event.preventDefault();
        let roomName = this.roomName;
        this.props.addRoom(roomName.value);
    }

  render() {
    return (
      <div className="modal-container" style={{height: 200}}>
        <Modal
          show={this.props.showAddRoom}
          onHide={this.props.closeAddRoom}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Add a New Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
        <Form className="addRoom-form" onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup>
                <FormControl type="text" placeholder="Enter a room name" inputRef={(input) => this.roomName = input}/>
            </FormGroup>
            <Button onClick={this.props.closeAddRoom}>
                Cancel
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button type="submit" onClick={this.props.closeAddRoom}>
                Add room
            </Button>
        </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

export default AddRoom;