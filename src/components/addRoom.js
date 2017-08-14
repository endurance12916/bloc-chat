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
    console.log('hideAddRoom', this.props.hideAddRoom);
    console.log('showAddRoom', this.props.showAddRoom);
    return (
      <div className="modal-container" style={{height: 200}}>
        <Modal
          show={this.props.showAddRoom}
          onHide={this.props.hideAddRoom}
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
            <Button type="submit" onClick={this.props.hideAddRoom}>
                Add room
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button onClick={this.props.hideAddRoom}>
                Cancel
            </Button>
        </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

export default AddRoom;