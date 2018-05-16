import React, { Component } from 'react';
import '../stylesheets/app.css';

export default class StartButton extends Component {
  constructor(props) {
    super(props);
    this.state = { link: null };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    fetch('/api/getLink')
      .then(res => res.json())
      .then(data => this.setState({ link: data.link }));
  }
  render() {
    return (
      <form id="startForm">
        <input type="button" id="startButton" onClick={this.handleClick} value="Start!" />
        <label htmlFor="startButton">
          {this.state.link ? (
            <h1>{this.state.link}</h1>
                    ) : (<h1>Click the button</h1>)}
        </label>
      </form>
    );
  }
}
