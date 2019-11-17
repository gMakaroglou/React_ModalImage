import React, { Component } from 'react'
import { Button, Header,Image, Icon, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export default class ModalExampleControlled extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='large'
      >
        <Header icon='browser' content='Cookies policy' />
        <Modal.Content>
          <h3>This website uses cookies to ensure the best user experience.</h3>
          <Image wrapped size='huge' src={this.props.image}/>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
