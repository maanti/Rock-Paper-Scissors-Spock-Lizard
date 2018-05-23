let io;
let players;


function nextRound(data) {
  // ////////////////////////////////
}

function playerAnswerHandler(data) {
  // //////////////////////////
}


exports.initGame = (sio, gameId) => {
  io = sio;
  players = io.sockets.in(gameId);
  players.emit('startGame');
  players.on('nextRound', data => nextRound(data));
  players.on('playerAnswered', data => playerAnswerHandler(data));
  console.log('Game init is completed');
};
