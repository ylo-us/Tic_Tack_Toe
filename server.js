var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

// app.use(express.static('client'));

var players = [];
var ticTacToe = [['', '', ''], ['', '', ''], ['', '', '']];
io.on('connection', function(client) {
	console.log('a user connected');
	if (players.length < 2) {
		players.push(client.socketId);
	} else {
		client.emit('sorry... no available room for you :(');
	}
	client.on('ready', function(info) {

	});
	client.on('placeMove', function(coordinateX, coordinateY) {
		if (client.socketId === players[0]) {
			ticTacToe[coordinateY][coordinateX] = 'O';
		} else if (client.socketId === players[1]) {
			ticTacToe[coordinateY][coordinateX] = 'X';
		}
		io.emit('update', ticTacToe);
	});
	client.on('disconnect', function() {
		if (client.socketId === players[0]) {
			players.shift();
		} else if (client.socketId === players[1]) {
			players.pop();
		}
		console.log('a user just disconnected');
	})


});

server.listen(port);
console.log('server is on port: ', port);