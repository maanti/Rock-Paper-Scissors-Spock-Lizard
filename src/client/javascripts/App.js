/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import io from 'socket.io-client';
import '../stylesheets/app.css';

const IO = {
  init() {
    IO.socket = io.connect('http://localhost:8080');
    IO.bindEvents();
  },
  bindEvents() {
    IO.socket.on('connected', IO.onConnected());
    IO.socket.on('newGameCreated', IO.onNewGameCreated());
    IO.socket.on('playerJoinedRoom', IO.onPlayerJoinedRoom());
    IO.socket.on('beginNewGame', IO.beginNewGame());
    IO.socket.on('error', IO.showError());
    IO.socket.on('gameOver', IO.onGameOver());
  },
  onConnected() {
    mySocketId = IO.socket.socket.sessionId;
  }

};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: this.props.match.params.room,
      link: null
    };
  }
  componentDidMount() {
    const socket = io.connect('http://localhost:8080');
    socket.on('connect', () => {
      socket.emit('playerJoinGame', this.state.room);
    });
    socket.on('connectedToRoom', (room) => {
      console.log(room);
      if (this.state.room !== room) {
        console.log(room);
        this.state.link = `Share this link with a friend to play: ${window.location.href}${room}`;
        this.setState({ room });
      }
    });
    socket.on('roomIsFull', () => console.log('roomIsFull'));
    socket.on('message', message => console.log(message));
  }
  render() {
    return (
      <div>
        You are in room №{this.state.room}<br />
        {this.state.link}
      </div>);
  }
}
