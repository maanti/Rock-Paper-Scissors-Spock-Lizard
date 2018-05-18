const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const express = require('express');
const os = require('os');

let roomCounter = 0;

app.use(express.static('dist'));
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/api/getLink', (req, res) => res.send({ link: 'Link will be here' }));
server.listen(8080, () => console.log('Listening on port 8080!'));

io.sockets.on('connection', (socket) => {
  socket.on('room', (room) => {
    if (room !== '') {
      socket.join(room);
      io.sockets.in(room).emit('message', `${room}`);
    } else {
      socket.join(roomCounter);
      io.sockets.in(roomCounter).emit('message', `${roomCounter}`);
      roomCounter += 1;
    }
  });
});

