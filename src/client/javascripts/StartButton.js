import React, { Component } from 'react';
import io from 'socket.io-client';
import '../stylesheets/app.css';

export default class StartButton extends Component {
  constructor(props) {
    super(props);
    this.state = { room: null };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const socket = io.connect('localhost:8080');
    socket.on('connect', () => {
      const room = document.getElementById('room').value;
      socket.emit('room', room);
    });
    socket.on('message', (room) => {
      this.setState({ room });
    });
  }
  render() {
    return (
      <form id="startForm">
        <input type="number" id="room" placeholder="Type number of the room" />
        <input type="button" id="startButton" onClick={this.handleClick} value="Start!" />
        <label htmlFor="startButton">
          {this.state.room ? (
            <h1>you are in room №{this.state.room}</h1>
                    ) : (<h1>Click the button</h1>)}
        </label>
      </form>
    );
  }
}
