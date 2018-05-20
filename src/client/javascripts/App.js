import React, { Component } from 'react';
import io from 'socket.io-client';
import '../stylesheets/app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: this.props.match.params.room,
      link: false
    };
  }

  componentDidMount() {
    const socket = io.connect('localhost:8080');
    socket.on('connect', () => {
      socket.emit('room', this.state.room);
    });
    socket.on('message', (room) => {
      if (this.state.room !== room) {
        this.state.link = `Share this link with a friend to play: ${window.location.href}${room}`;
        this.setState({ room });
      }
    });
    socket.on('link', this.state.link = true);
  }
  render() {
    return (
      <div>
        You are in room №{this.state.room}<br />
        {this.state.link}
      </div>);
  }
}
