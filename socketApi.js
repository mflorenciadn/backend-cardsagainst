// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");
// const rooms = require("./utils/rooms")
// const port = process.env.PORT || 4001;
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// const {createPlayer, playerJoin, playerLeave, getCurrentPlayer, getRoomUsers} = require('./utils/players');
// const {createRoom } = require('./utils/rooms');


// io.on("connect", socket => {
//   joinToRoom(socket)
// })

// const joinToRoom = socket => {
//   socket.on('createPlayer', name => createPlayer(socket.id, name))
//   socket.on('createRoom', roomId => createRoom(roomId))
//   socket.on('joinRoom', (player, room) => playerJoin(player, room))
//   //socket.emit()
// }
  
//   // socket.on('createPlayer', (name) => {
//   //   return createPlayer(socket.id, name) 
//   // });

//   // socket.on('createRoom', (id) => {
//   //   return createRoom(id);
//   // });

//   // socket.on('joinRoom', (player, room) => {
//   //   const roomComplete = playerJoin(player, room);

   
//     // socket.broadcast
//     //   .to(player.roomId)
//     //   .emit(
//     //     'chat message',
//     //     `${player.name} se unió a la sala!`
//     //   );
//  // });


  
//   // socket.on('newRound', (id) => {
//   //     console.log('log desde back')
//   //     const round = rooms.createRound(id)
//   // })

//   // socket.on('chat update', (msg) => {
//   //   const id = socket.id;
//   //   const player = getCurrentPlayer(id);
//   //   io.to(player.roomId).emit('chat message', `${player.name}: ${msg}`)
//   // })

//   // socket.on('leave room', () => {
//   //   const player = playerLeave(socket.id);
//   //   console.log("leave room se ejecuta")
//   //   console.log(player)
//   //   if(player){
//   //     io.to(player.roomId).emit('chat message', `${player.name} ha salido de la sala`)
//   //   }
//   // });


//   // socket.on("disconnect", () => {
//   //   const player = playerLeave(socket.id);
//   //   if(player){
//   //     io.to(player.roomId).emit('chat message', `${player.name} ha salido de la sala`)
//   //   }
//   // });
// //});






  
// server.listen(port, () => console.log(`Listening on port ${port}`));