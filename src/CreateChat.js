import React from 'react';
import './CreateChat.css';
import axios from 'axios';

export class CreateChat extends React.Component {
  constructor() {
    super();
    this.state = { requested: null }
    this.handleChange = this.handleChange.bind(this);
  }

  handleSendEvent() {
    console.log('sending');
    axios({
      method: 'get',
      url: 'http://192.168.1.198:3001/chat_room',
      params: {room: this.state.requested}
    }).then(response => {
      this.props.onChatRoomChange(response.data.success);
      console.log('success');
    })
    .catch(error => console.log(error))
  }

  handleChange(e) {
    let val = e.target.value;
    this.setState({requested: val});
  }

  render() {
    return(
      <div className="CreateChat">
        <h3 id="join">Join or create a private chat</h3>
        <p>It is recommended to name your chat room with a sentence</p>
        <p>For maximum security, you may require a password</p>
        <input type="text"
         placeholder="Chat Room Name"
         onChange={(e) => this.handleChange(e)} />
        <button onClick={this.handleSendEvent.bind(this)}>Create/Join</button>
      </div>
    )
  }
}