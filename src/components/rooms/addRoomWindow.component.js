import React, { Component } from 'react';
import { Modal, Form, FormGroup, FormControl, Button } from 'react-bootstrap'

class AddRoomWindow extends Component {

  // should this be in a container?
  handleSubmit = (event) => {
      // preventDefault => page doesn't reload when form is submitted
      event.preventDefault();
      let id = this.props.rooms.length||0;
      let newRoom = {id: 'room '+ id, name: this.roomName.value};
      this.props.addRoom(newRoom);
      this.props.setActiveRoom(newRoom);
  }

  render() {
    return (
      <div className="modal-container" style={{height: 200}}>
        <Modal
          show={this.props.isAddRoomWindowVisible}
          onHide={this.props.hideAddRoomWindow} // onHide is looking for a function
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
            <Button type="submit" onClick={this.props.hideAddRoomWindow}>
                Add room
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button onClick={this.props.hideAddRoomWindow}>
                Cancel
            </Button>
        </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

export default AddRoomWindow;