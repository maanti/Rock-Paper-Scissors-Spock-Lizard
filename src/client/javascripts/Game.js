import React, { Component } from 'react';
import '../stylesheets/app.css';

export default class Game extends Component {
  static handleClick(choice) {
    console.log('this is:', choice);
  }
  render() {
    return (
      <div className="icons">
        <input type="image" className="icon" id="rock" src="/src/client/images/rock.png" onClick={() => Game.handleClick('rock')} alt="rock" />
        <input type="image" className="icon" id="scissors" src="/src/client/images/scissors.png" onClick={() => Game.handleClick('scissors')} alt="scissors" />
        <input type="image" className="icon" id="paper" src="/src/client/images/paper.png" onClick={() => Game.handleClick('paper')} alt="paper" />
        <input type="image" className="icon" id="lizard" src="/src/client/images/lizard.png" onClick={() => Game.handleClick('lizard')} alt="lizard" />
        <input type="image" className="icon" id="spock" src="/src/client/images/spock.png" onClick={() => Game.handleClick('spock')} alt="spock" />
      </div>
    );
  }
}
