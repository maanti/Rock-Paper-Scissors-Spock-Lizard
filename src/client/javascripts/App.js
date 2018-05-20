import React, { Component } from 'react';
import io from 'socket.io-client';
import '../stylesheets/app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { room: this.props.match.params.room };
  }

  componentDidMount() {
    const socket = io.connect('localhost:8080');
    socket.on('connect', () => {
      socket.emit('room', this.state.room);
    });
    socket.on('message', (room) => {
      this.setState({ room });
    });
  }
  render() {
    return <div>You are in room №{this.state.room}</div>;
  }
}
