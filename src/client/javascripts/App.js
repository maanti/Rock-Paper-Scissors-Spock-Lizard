import React, { Component } from 'react';
import '../stylesheets/app.css';
import '../javascripts/StartButton';
import StartButton from './StartButton';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: null };
  }

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    return (
      <div>
        <StartButton />
        {this.state.username ? (
          <h1>Hello, {this.state.username}!</h1>
        ) : (
          <h1>Loading.. please wait!</h1>
        )}
      </div>
    );
  }
}
