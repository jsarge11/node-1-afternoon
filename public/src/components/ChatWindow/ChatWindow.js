import React, { Component } from "react";
import './ChatWindow.css';

import axios from "axios";
import url from '../../api'

import Message from './Message/Message';

import dateCreator from '../../utils/dateCreator';

export default class ChatWindow extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      name: '',
      text: ''
    };

    this.handleChange = this.handleChange.bind( this );
    this.inputName = this.inputName.bind( this );
    this.createMessage = this.createMessage.bind( this );
    this.editMessage = this.editMessage.bind( this );
    this.removeMessage = this.removeMessage.bind( this );
  }

  componentDidMount() {
    //only sets the persons name if it hasn't been set yet
    if (!this.state.name) { 
      this.inputName();
    }

    axios.get( url ).then( response => {
      console.log(response.data);
      this.setState({ messages: response.data });
    });
  }

  inputName() {
   let hasEnteredName = false;
   let person = '';
   
   while (!hasEnteredName) {
    person = prompt("Enter your name before entering: ");
    if((person)) {
       console.log(person);
       hasEnteredName = true;
    }

    this.setState({ name: person})
    }
  }

  handleChange( event ) {
    this.setState({ text: event.target.value });
  }

  createMessage( event ) {
    
    const { text, name } = this.state;
    if ( event.key === "Enter" && text.length !== 0 ) {
      axios.post( url, { text, time: dateCreator(), name } ).then( response => {
        
        this.setState({ messages: response.data });
      });

      this.setState({ text: '' });
    }
  }

  editMessage( id, text, name ) {
    console.log( 'editMessage:', id, text, name ); 
    axios.put( url + `/${id}`, { text } ).then( response => {
      console.log("response data: " + response.data);
      this.setState({ messages: response.data });
    });
  }

  removeMessage( id ) {
    axios.delete( url + `/${id}` ).then( response => {
      this.setState({ messages: response.data });
    });
  }

  render() {

   
    return (
      <div id="ChatWindow__container">
        <div id="ChatWindow__messagesParentContainer">
          <div id="ChatWindow__messagesChildContainer">
            {
              this.state.messages.map( message => (
                console.log(message.name),
                <Message id={ message.id} key={ message.id } text={ message.text } time={ message.time } edit={ this.editMessage } remove={ this.removeMessage } name={ message.name} />
              ))
            }
          </div>
        </div>
        <div id="ChatWindow__newMessageContainer">
          <input placeholder="What's on your mind? Press enter." 
                 onKeyPress={ this.createMessage }
                 onChange={ this.handleChange }
                 value={ this.state.text }
          />
        </div>

        <div>User: {this.state.name} </div>
      </div>
    )
  }
}