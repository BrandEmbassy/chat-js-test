
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var avatarId = Math.floor(Math.random() * Math.floor(49)) + 1;

server.listen('4444', () => {
  console.log('listening for requests...');
});


io.on('connection', (socket) => {
  socket.on('chat', (id, username, message) => {
    console.log('message ' + id + ' received, sent by: ' + username + ', content: ' + message);
    io.emit('chat', id, username, message, avatarId);
  });
});
