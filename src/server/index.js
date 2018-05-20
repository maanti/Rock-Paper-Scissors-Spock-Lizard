const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const express = require('express');
const path = require('path');

let roomCounter = 0;

app.use(express.static(path.join(__dirname, '/../../public')));

server.listen(8080, () => console.log('Listening on port 8080!'));

io.sockets.on('connection', (socket) => {
  console.log('Connected');
  socket.on('room', (room) => {
    console.log(room);
    if (room !== null) {
      socket.join(room);
      io.sockets.in(room).emit('message', `${room}`);
    } else {
      socket.join(roomCounter);
      io.sockets.in(roomCounter).emit('message', `${roomCounter}`);
      io.sockets.in(roomCounter).emit('link');
      roomCounter += 1;
    }
  });
});
