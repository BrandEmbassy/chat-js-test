
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var avatarId = Math.floor(Math.random() * Math.floor(49)) + 1;

global.users = [];

server.listen('4444', () => {
  console.log('listening for requests...');
});

function addUser(username) {
	
	global.users[username] = {
		'avatarId': Math.floor(Math.random() * Math.floor(49)) + 1,
		'userId': Object.keys(global.users).length + 1
	};

}

io.on('connection', (socket) => {
  socket.on('chat', (id, username, message) => {
	  
	if (!global.users[username]) addUser(username);	
	avatarId = global.users[username].avatarId;
	userId = global.users[username].userId;
	
    console.log('message ' + id + ' received, sent by: ' + username + ', content: ' + message);
    
    io.emit('chat', id, username, message, avatarId, userId);
    
  });
});
