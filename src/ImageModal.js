import React from 'react';
import firebase from './firebaseconfig'
import Modal from './modalexample' 

class HelloMessage extends React.Component {
    constructor () {
      super()
      this.state = {
        inco6: '',
       // inco2: ''
       image:""
      }
      
     
    }
    componentDidUpdate(){  

    }
    componentDidMount(){
        this.getImage();
    }
    getImage () {

        const storage = firebase.storage().ref();   
        let image = this.props.image;
        let user = this.props.user;
        if(user!=undefined){
        user = user.replace('.',',');
      let { state } = this
    storage.child(`/${user}/${image}`).getDownloadURL().then((url) => {
        this.state.image = url
        this.setState(state)
      }).catch((error) => {
        // Handle any errors
      })
   //   console.log(this.state)
    }
    }
  shouldComponentUpdate(nextProps,nextState){
    if(this.state !== nextState){
      this.getImage();
      return true;
    }
    return false;
  }
    render() {

      return (
        <div>
          {/* Hello Lithuania<br />
          <img src={ this.state.inco1 } alt="Lithuanian flag" />
          <br />
          Hello United Kingdom<br />
          <img src={ this.state.inco3 } alt="UK flag" />
          { /* all the markup of your page */ }
        {/* <button onClick={() => this.setState({showModal: true})}>Add Work Log</button>
        <button onClick={() => this.getImage(this.props.image)}>HOWDY</button> */} 
        { /* anything else */ }

        { /* modal is here but it is hidden */ }
        <Modal open={this.state.showModal} image={this.state.image}>...</Modal>
        </div>
      );
    }
  }
  export default HelloMessage;
//   ReactDOM.render(
//     <HelloMessage name="Jane" />,
//     document.getElementById('app')
//   )