const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const constants = require('./assets/constants');
const room = require('./data/Models/room');
const player = require('./data/Models/player');

io.on('connect', socket => {
    socket.send('Hello!');
});

io.listen(3000);
