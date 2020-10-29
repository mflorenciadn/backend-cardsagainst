const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

const Player = require('Player');


io.on("connection", (socket) => {
  //mensaje al que se conecta
  socket.emit('message', 'Bienvenido a Cards Agains ORT');
  
  //mensaje a todos menos al que se conecta
  // socket.on('connect', () => {
  //   socket.broadcast.emit('message', 'Un usuario ingreso')
  // })
  

  //mensaje a todos en general
  //io.emit()

  socket.on('chat message', msg => {
    console.log(msg);
    io.emit('chat message', msg);
  })

  socket.on("disconnect", () => {
    io.emit('message', 'Un usuario salio de la sala')
  });
});

// io.on('connection', (socket) => {
//   socket.join('room 237', () => {
//     let rooms = Object.keys(socket.rooms);
//     console.log(rooms); // [ <socket.id>, 'room 237' ]
//     io.to('room 237').emit('a new user has joined the room'); // broadcast to everyone in the room
//   });
// });






  
server.listen(port, () => console.log(`Listening on port ${port}`));