let io;
let gameSocket;
let roomsCounter = 0;

function hostCreateNewGame() {
  const gameId = roomsCounter;
  roomsCounter += 1;

  this.emit('newGameCreated', gameId);
  this.join(gameId);
}

function hostPrepareGame(gameId) {
  const sock = this;
  const data = {
    mySocketId: sock.id,
    gameId
  };
  io.sockets.in(data.gameId).emit('beginNewGame', data);
}

function hostStartGame(gameId) {
  console.log('Game started');
  // ///////////////////////////////
}

function hostNextRound(data) {
  // ////////////////////////////////
}

function playerJoinGame(data) {
  // /////////////////////////////////
}

function playerAnswer(data) {
  // //////////////////////////
}

function playerRestart(data) {
  // /////////////////////////
}


exports.initGame = function (sio, socket) {
  io = sio;
  gameSocket = socket;
  gameSocket.emit('connected', { message: 'You are connected' });

  // Host events
  gameSocket.on('hostCreateNewGame', hostCreateNewGame);
  gameSocket.on('hostRoomIsFull', hostPrepareGame);
  gameSocket.on('hostCountdownFinished', hostStartGame);
  gameSocket.on('hostNextRound', hostNextRound);

  // Player events
  gameSocket.on('playerJoinGame', playerJoinGame);
  gameSocket.on('playerAnswer', playerAnswer);
  gameSocket.on('playerRestart', playerRestart);
};
