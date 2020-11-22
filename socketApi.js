const express = require('express');
const app = express();
<<<<<<< Updated upstream
const server = new (require('http').Server)(app);
const io = require('socket.io')(server);
const constants = require('./assets/constants');
const room = require('./data/Models/room');
const player = require('./data/Models/player');

io.on('connect', socket => {
    socket.send('Hello!');
=======
const server = http.createServer(app);
const io = socketIo(server);

const {playerJoin, playerLeave, getCurrentPlayer, getRoomUsers} = require('./utils/players');



io.on("connect", (socket) => {

  socket.on('joinRoom', (name, roomId) => {
    const room = rooms.createRoom(roomId)
    const player = playerJoin(socket.id, name, roomId);
    
    socket.join(room.roomId);
    
    socket.broadcast
      .to(player.roomId)
      .emit(
        'chat message',
        `${player.name} se unió a la sala!`
      );
  });

  
  socket.on('newRound', (roomId) => {
      console.log('log desde back')
      const round = rooms.createRound(roomId)
      console.log(round)
  })

  socket.on('chat update', (msg) => {
    const id = socket.id;
    const player = getCurrentplayer(id);
    io.to(player.roomId).emit('chat message', `${player.name}: ${msg}`)
  })

  // socket.on('leave room', () => {
  //   const player = playerLeave(socket.id);
  //   console.log("leave room se ejecuta")
  //   console.log(player)
  //   if(player){
  //     io.to(player.roomId).emit('chat message', `${player.name} ha salido de la sala`)
  //   }
  // });


  socket.on("disconnect", () => {
    const player = playerLeave(socket.id);
    if(player){
      io.to(player.roomId).emit('chat message', `${player.name} ha salido de la sala`)
    }
  });
>>>>>>> Stashed changes
});

io.listen(3000);
