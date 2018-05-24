import React, { Component } from 'react';
import '../stylesheets/app.css';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: this.props.socket
    };
  }
  handleClick(ans) {
    console.log('this is:', ans);
    this.state.socket.emit('playerAnswered', ans);
  }
  render() {
    return (
      <div className="icons">
        <input type="image" className="icon" id="rock" src="/src/client/images/rock.png" onClick={() => this.handleClick('rock')} alt="rock" />
        <input type="image" className="icon" id="scissors" src="/src/client/images/scissors.png" onClick={() => this.handleClick('scissors')} alt="scissors" />
        <input type="image" className="icon" id="paper" src="/src/client/images/paper.png" onClick={() => this.handleClick('paper')} alt="paper" />
        <input type="image" className="icon" id="lizard" src="/src/client/images/lizard.png" onClick={() => this.handleClick('lizard')} alt="lizard" />
        <input type="image" className="icon" id="spock" src="/src/client/images/spock.png" onClick={() => this.handleClick('spock')} alt="spock" />
      </div>
    );
  }
}
