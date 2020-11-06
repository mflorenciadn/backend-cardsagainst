const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const {playerJoin, playerLeave, getCurrentplayer, getRoomUsers} = require('./utils/players');



io.on("connect", (socket) => {

  socket.on('joinRoom', (name, roomId) => {
    const player = playerJoin(socket.id, name, roomId);
    
    socket.join(player.roomId);
    
    socket.broadcast
      .to(player.roomId)
      .emit(
        'chat message',
        `${player.name} se unió a la sala!`
      );
  });

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
});




  // socket.on('create roomId', (roomIdId, name) => {
  //   if(gameLogic.checkroomIds(gameLogic.roomIds, roomIdId))
  //   {
  //     console.log('ya existe')
  //   }
  //   else
  //   {
  //     gameLogic.createroomId(roomIdId)
  //     gameLogic.createPlayer(socket.id, name, roomIdId)
  //   }
    
  // })

  // socket.on('join roomId', (roomIdId, name) => {
  //   socket.join(roomIdId, () => {
  //     const player = gameLogic.createPlayer(socket.id, name, roomIdId)
  //     io.to(player.rooomId).emit('chat message', `${player.name} se unió a la sala`)
  //   })
  // })






  
server.listen(port, () => console.log(`Listening on port ${port}`));