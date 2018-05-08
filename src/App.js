import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Header } from './Header';
import { CreateChat } from './CreateChat';
import { ChatRoom } from './ChatRoom';
import { Color } from './Color';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatRoom: null
    };
    this.handleChatRoomChange = this.handleChatRoomChange.bind(this);
  }

  handleChatRoomChange(room) {
    this.setState({chatRoom: room});
  }

  render() {
    return (
      <div className="App">
        <Header />
        { this.state.chatRoom ? <ChatRoom room={this.state.chatRoom} /> : <CreateChat onChatRoomChange={this.handleChatRoomChange} /> }
        <Color />
      </div>
    );
  }
}

export default App;
