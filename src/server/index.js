const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const express = require('express');
const path = require('path');
const rpsls = require('./rpsls');

const playersInRoom = [];
let gameIdCounter = 1;
app.use(express.static(path.join(__dirname, '/../../public')));

server.listen(8080, () => console.log('Listening on port 8080!'));

io.sockets.on('connection', (socket) => {
  console.log('connected');
  socket.on('joinGame', (gameId) => {
    console.log(gameId);
    console.log(playersInRoom[gameId]);
    if (gameId === null) {
      console.log('Fist connection to the room. Room will be created');
      gameId = gameIdCounter;
      gameIdCounter += 1;
    }
    if (playersInRoom[gameId] === undefined) {
      playersInRoom[gameId] = 1;
      socket.join(gameId);
      socket.emit('shareLink', gameId);
    } else if (playersInRoom[gameId] === 1) {
      playersInRoom[gameId] += 1;
      socket.join(gameId);
      console.log('roomIsFull');
      io.sockets.in(gameId).emit('roomIsFull', gameId);
      gameIdCounter += 1;
      console.log('Game init will be started');
      rpsls.initGame(io, gameId);
    } else {
      console.log('Something went wrong (server/index.js)');
      io.sockets.in(gameId).emit('error', 'Something went wrong (server/index.js)');
    }
  });
});

