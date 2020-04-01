
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const users = [];

server.listen('4444', () => {
  console.log('listening for requests...');
});

function addUser(username) {
	users[username] = {
		avatarId: Math.floor(Math.random() * Math.floor(49)) + 1,
		userId: users.length + 1
	};
}

io.on('connection', (socket) => {
  socket.on('chat', (id, username, message) => {

		if (users[username] === undefined) {
			addUser(username);
		}
		const { avatarId, userId } = users[username];

    console.log('message ' + id + ' received, sent by: ' + username + ', content: ' + message);

    io.emit('chat', id, username, message, avatarId, userId);
  });
});
