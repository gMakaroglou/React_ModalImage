import React, { Component } from "react";
import { Button, Header, Image, Icon, Modal } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import styles from "./styles.module.css";

export default class ModalExampleControlled extends Component {
  state = { modalOpen: false };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>View Image</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size="large"
      >
        <Header icon="browser" content="Unipi Android Database" />
        <Modal.Content>
          <h1>Image From Firebase:</h1>
          <Image wrapped size="huge" src={this.props.image} />
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose} inverted>
            <Icon name="checkmark" /> Done
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
