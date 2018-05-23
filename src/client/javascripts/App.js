/* eslint-disable react/prop-types,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import io from 'socket.io-client';
import '../stylesheets/app.css';
import { Link } from 'react-router-dom';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: this.props.match.params.gameId,
      link: null,
      error: null
    };
  }
  componentDidMount() {
    const socket = io.connect('http://localhost:8080');
    socket.on('connect', () => {
      socket.emit('joinGame', this.state.gameId);
    });
    socket.on('shareLink', (gameId) => {
      const pattern = new RegExp('\\d+$');
      if (pattern.test(window.location.href)) {
        this.state.link = `Share this link with a friend to play: ${window.location.href}`;
        this.setState({ gameId });
      } else {
        this.state.link = `Share this link with a friend to play: ${window.location.href}${gameId}`;
        this.setState({ gameId });
      }
    });

    socket.on('roomIsFull', () => {
      console.log('roomIsFull');
    });
    socket.on('startGame', () => { console.log('Game is started'); });
    socket.on('error', (error) => { this.state.error = error; });
  }
  render() {
    return (
      <div>
        You are in room №{this.state.gameId}<br />
        {this.state.link}
        {this.state.error}
        <Link to={`${this.state.gameId}/play`}>START</Link>
      </div>);
  }
}
