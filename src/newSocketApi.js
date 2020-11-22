const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const port = process.env.PORT || 4001
const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const dataRooms = require('./data/rooms_data')
const dataPlayers = require('./data/players_data')

io.on('connect', (socket) => {
	subscribeToCao(socket)
})

const subscribeToCao = (socket) => {
	socket.on('createRoomAndGo', roomId, (name) => newRoom(roomId, name))
	socket.on('joinRoom', (player, room) => joinToRoom(player, room))
	socket.on('getPlayersByRoomId', (roomId) => getPlayers(roomId))
	socket.on('newPlayer', () => subscribeToPlayers())
	socket.on('disconnect', () => handleDisconnection(socket))

	socket.emit('getPlayerName', dataPlayers.getPlayerName(socket.id))
	socket.emit('getRoom', dataRooms.getRoomByPlayerId(socket.id))
}

const newRoom = (roomId, name) => {
	const myRoom = dataRooms.createRoom(roomId)
	const firstPlayer = dataPlayers.createPlayer(socket.id, name)
	socket.emit('joinRoom', (firstPlayer, myRoom))
	socket.emit('newPlayer')
	socket.join(myRoom.id)
}

const joinToRoom = (player, room) => {
	player.roomId = room.id
	room.players.push(player)
}

const getPlayers = (roomId) => {
	const myPlayers = dataRooms.getPlayersByRoomId(roomId)
	socket.emit('updatePlayers', myPlayers)
}

const subscribeToPlayers = () => {
	const myPlayers = dataPlayers.getTotalPlayers()
	socket.emit('updatePlayers', myPlayers)
}

const handleDisconnection = (socket) => {
	dataPlayers.deletePlayerById(socket.id)
}

// const subscribeToGame = async (socket, userInfo) => {
//   await findMatch(socket, userInfo);
//   socket.on("move", data => {
//     moveData(data);
//   });
//   socket.on("cancelSearch", async () => {
//     await dataQueue.deleteQueueUserBySocketId(socket.id);
//     await subscribeToQueueUsers();
//   });
// };

// const moveData = async moveData => {
//   console.log("moveData: ", moveData);
//   let room = await dataRooms.getRoomByPlayerId(moveData.socketId);
//   room = await dataRooms.updateRoom(room, moveData);
//   console.log("updatedRoom: ", room);
//   let winner = room.moves > 4 ? gameLogic.gameWon(room.boardState) : null;
//   socketApi.io.in(room.id).emit("boardUpdate", room);

//   if (winner || room.moves === 9) {
//     socketApi.io.in(room.id).emit("matchEnded", winner);
//     socketApi.io.in(room.id).clients((error, clients) => {
//       clients.forEach(socket_id => {
//         const socket = socketApi.io.sockets.sockets[socket_id];
//         socket.leave(room.id);
//         socket.removeAllListeners();
//         subscribeToTicTaeToe(socket);
//       });
//     });

//     await dataRooms.deleteRoom(room.id);
//   }
// };

// async function findMatch(socket, userInfo) {
//   let peer = await dataQueue.getSingleQueueUser();
//   console.log(peer);
//   if (peer != null) {
//     if (peer.socketId != socket.id) {
//       let player1;
//       let player2;

//       let random = Math.random();
//       if (random > 0.5) {
//         player1 = "X";
//         player2 = "O";
//       } else {
//         player1 = "O";
//         player2 = "X";
//       }
//       peerSocket = socketApi.io.sockets.sockets[peer.socketId];
//       console.log(random);
//       console.log("player 1: ", player1);
//       console.log("player 2: ", player2);
//       let room = new RoomModel.Room(
//         socket.id + "#" + peer.socketId,
//         peerSocket,
//         socket,
//         player1,
//         player2
//       );

//       dataRooms.insertRoom(room);

//       peerSocket.join(room.id);
//       socket.join(room.id);

//       peerSocket.emit("matchFound", player1);
//       socket.emit("matchFound", player2);

//       await dataQueue.deleteQueueUserBySocketId(peer.socketId);
//     }
//   } else {
//     await dataQueue.insertQueueUser({
//       googleId: userInfo.googleId,
//       name: userInfo.name,
//       socketId: socket.id,
//     });
//   }
// }

// async function endMatch(room, disconnectedPlayer) {
//   let winner = null;

//   if (room.player1Id == disconnectedPlayer) {
//     winner = room.player2Token;
//   } else {
//     winner = room.player1Token;
//   }

//   socketApi.io.in(room.id).emit("matchEnded", winner);
//   await dataRooms.deleteRoom(room.id);
// }

server.listen(port, () => console.log(`Listening on port ${port}`))
