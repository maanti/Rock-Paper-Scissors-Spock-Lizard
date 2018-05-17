const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const express = require('express');
const os = require('os');

app.use(express.static('dist'));
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/api/getLink', (req, res) => res.send({ link: 'Link will be here' }));
server.listen(8080, () => console.log('Listening on port 8080!'));

io.on('connection', (socket) => {
  console.log('a user connected');
});

