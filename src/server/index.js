const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const express = require('express');
const path = require('path');
const rpsls = require('./rpsls');

app.use(express.static(path.join(__dirname, '/../../public')));

server.listen(8080, () => console.log('Listening on port 8080!'));

io.sockets.on('connection', (socket) => {
  console.log('Connected');
  rpsls.initGame(io, socket);
});
