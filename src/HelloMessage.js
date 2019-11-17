import React from 'react';
import firebase from './firebaseconfig'
import Modal from './modalexample' 
class HelloMessage extends React.Component {
    constructor () {
      super()
      this.state = {
        inco6: '',
       // inco2: ''
      }
      
      this.getImage('inco1')
      //this.getImage('inco2')
     
    }
    
    getImage (image) {
        const storage = firebase.storage().ref();   
      let { state } = this
    storage.child(`/images/${image}.png`).getDownloadURL().then((url) => {
        this.state[image] = url
        this.setState(state)
      }).catch((error) => {
        // Handle any errors
      })
    }
  
    render() {
      return (
        <div>
          Hello Lithuania<br />
          <img src={ this.state.inco1 } alt="Lithuanian flag" />
          <br />
          Hello United Kingdom<br />
          <img src={ this.state.inco3 } alt="UK flag" />
          { /* all the markup of your page */ }
        <button onClick={() => this.setState({showModal: true})}>Add Work Log</button>
        { /* anything else */ }

        { /* modal is here but it is hidden */ }
        <Modal open={this.state.showModal} image={this.state.inco1}>...</Modal>
        </div>
      );
    }
  }
  export default HelloMessage;
//   ReactDOM.render(
//     <HelloMessage name="Jane" />,
//     document.getElementById('app')
//   )