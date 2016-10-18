var prompt = require('prompt');
// var socket = require('')
var socket = io('http://localhost');
var boardGrid = ['|', '-'];
socket.emit('ready', 'test');