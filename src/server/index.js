const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const express = require('express');
const path = require('path');

const playersInRoom = [];
let gameIdCounter = 1;
let ans1 = [];
let ans2 = [];
app.use(express.static(path.join(__dirname, '/../../public')));

server.listen(8080, () => console.log('Listening on port 8080!'));

function nextRound(data) {
  // ////////////////////////////////
}

function playerAnswerHandler(answer1, answer2) {
  const a1 = answer1[1];
  const a2 = answer2[1];
  switch (a1) {
    case 'rock':
      if (a2 === 'scissors' || a2 === 'lizard') {
        answer1[0].emit('win');
        answer2[0].emit('loose');
      } else if (a2 === 'rock') {
        answer1[0].emit('tie');
        answer2[0].emit('tie');
      } else {
        answer1[0].emit('loose');
        answer2[0].emit('win');
      }
      break;
    case 'paper':
      if (a2 === 'rock' || a2 === 'spock') {
        answer1[0].emit('win');
        answer2[0].emit('loose');
      } else if (a2 === 'paper') {
        answer1[0].emit('tie');
        answer2[0].emit('tie');
      } else {
        answer1[0].emit('loose');
        answer2[0].emit('win');
      }
      break;
    case 'scissors':
      if (a2 === 'paper' || a2 === 'lizard') {
        answer1[0].emit('win');
        answer2[0].emit('loose');
      } else if (a2 === 'scissors') {
        answer1[0].emit('tie');
        answer2[0].emit('tie');
      } else {
        answer1[0].emit('loose');
        answer2[0].emit('win');
      }
      break;
    case 'lizard':
      if (a2 === 'paper' || a2 === 'spock') {
        answer1[0].emit('win');
        answer2[0].emit('loose');
      } else if (a2 === 'lizard') {
        answer1[0].emit('tie');
        answer2[0].emit('tie');
      } else {
        answer1[0].emit('loose');
        answer2[0].emit('win');
      }
      break;
    case 'spock':
      if (a2 === 'rock' || a2 === 'scissors') {
        answer1[0].emit('win');
        answer2[0].emit('loose');
      } else if (a2 === 'spock') {
        answer1[0].emit('tie');
        answer2[0].emit('tie');
      } else {
        answer1[0].emit('loose');
        answer2[0].emit('win');
      }
      break;
    default:
      answer1[0].emit('error');
      answer2[0].emit('error');
      break;
  }
}

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


      io.sockets.in(gameId).emit('startGame');
      socket.on('nextRound', data => nextRound(data));
      socket.on('playerAnswered', (ans) => {
        if (ans1.length === 0) {
          ans1[0] = socket;
          ans1[1] = ans;
        } else if (ans2.length === 0) {
          ans2[0] = socket;
          ans2[1] = ans;
          console.log(ans1, ans2);
        }
        playerAnswerHandler(ans1, ans2);
        ans1 = [];
        ans2 = [];
      });
      console.log('Game init is completed');
    } else {
      console.log('Something went wrong (server/index.js)');
      io.sockets.in(gameId).emit('error', 'Something went wrong (server/index.js)');
    }
  });
});

