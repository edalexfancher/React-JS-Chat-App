import React from 'react';
import './ChatRoom.css';
import Cable from 'actioncable';

export class ChatRoom extends React.Component {
  constructor() {
    super();
    this.state = {currentChatMessage: '', chatLogs: []};
  }

  renderChatLog() {
    return this.state.chatLogs.map( (element) => {
      return(
        <li key={`chat_${element.id}`}>
          <span className="chat-message">{element.content}</span>
          <span className="chat-created-at">{element.created_at}</span>
        </li>
      );
    });
  }

  createSocket() {
    let room = this.props.room;
    console.log(room);
    let cable = Cable.createConsumer('ws://192.168.1.198:3001/cable');
    this.chats = cable.subscriptions.create({channel: 'ChatChannel', room: room},
      {connected: () => {console.log('connected');},
       received: (data) => {
       let currentLog = this.state.chatLogs;
       currentLog.push(data);
       this.setState({chatLogs: currentLog});
       var objDiv = document.getElementById("Chat");
       objDiv.scrollTop = objDiv.scrollHeight;
      }, 
       create: function(chatContent) {
        this.perform('create', {
          content: chatContent
        });
       }
    });
  }

  handleSendEvent(event) {
    event.preventDefault();
    this.chats.create(this.state.currentChatMessage);
    this.setState({
      currentChatMessage: ''
    });
  }

  handleChatInputKeyPress(event) {
    if(event.key === 'Enter') {
      this.handleSendEvent(event);
    }
  }

  updateCurrentChatMessage(event) {
    this.setState({
      currentChatMessage: event.target.value
    });
  }

  clearChatDisplay() {
    this.setState({chatLogs: []});
  }

  componentDidMount() {
    this.createSocket();
  }

  render() {
    return(
      <div>
        <h1>{this.props.room}</h1>
        <div className="Chat-Log" id="Chat">
          <ul>
            {this.renderChatLog()}
          </ul>
        </div>
        <input value={this.state.currentChatMessage}
          onChange={(e) => this.updateCurrentChatMessage(e)}
          onKeyPress={(e) => this.handleChatInputKeyPress(e)}
          type='text'
          placeholder='Enter your message...'
          className='chat-input'/>
        <button className='send'
          onClick={(e) => this.handleSendEvent(e)}>
          Send
        </button>
        <button className="clear"
        onClick={this.clearChatDisplay.bind(this)} >
        Clear Chat Display
        </button>
      </div>
    )
  }
  
}