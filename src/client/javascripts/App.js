/* eslint-disable react/prop-types,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import io from 'socket.io-client';
import $ from 'jquery';
import '../stylesheets/app.css';
import Game from './Game';

let socket;

export default class App extends Component {
  static copyToClipboard(element) {
    const $temp = $('<input>');
    $('#welcome-container').append($temp);
    $temp.val($(element).text()).select();
    document.execCommand('copy');
    $temp.remove();
  }
  constructor(props) {
    super(props);
    this.state = {
      gameId: this.props.match.params.gameId,
      link: null,
      error: null,
      view: 'welcome'
    };
  }
  componentDidMount() {
    socket = io.connect('http://localhost:8080');
    socket.on('connect', () => {
      socket.emit('joinGame', this.state.gameId);
    });
    socket.on('shareLink', (gameId) => {
      const pattern = new RegExp('\\d+$');
      if (pattern.test(window.location.href)) {
        this.state.link = `${window.location.href}`;
        this.setState({ gameId });
      } else {
        this.state.link = `${window.location.href}${gameId}`;
        this.setState({ gameId });
      }
    });

    socket.on('roomIsFull', () => {
      console.log('roomIsFull');
    });
    socket.on('startGame', () => {
      console.log('Game is started');
      this.setState({ view: 'game' });
      this.render();
    });
    socket.on('error', (error) => { this.state.error = error; });
  }
  render() {
    if (this.state.view === 'game') {
      return (<Game socket={socket} />);
    }

    return (
      <div id="welcome-container">
        <h1>You are in room №{this.state.gameId}</h1><br />
        <h2>Share this link with a friend to play: <p id="link">{this.state.link}</p></h2>
        <button id="copy" onClick={() => App.copyToClipboard('#link')}>Copy</button>
        <div className="error"> {this.state.error} </div>
      </div>);
  }
}

