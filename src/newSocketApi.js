const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const rooms_data = require('./data/rooms_data')

const app = express()
const port = process.env.PORT || 4001
const server = http.createServer(app)
const io = socketIo(server)

io.on('connect', (socket) => {
	subscribeToCao(socket)
})

const subscribeToCao = (socket) => {
	socket.on('join_room', (playerName, roomId) =>
		newConnection(socket, playerName, roomId)
	)
	socket.on('disconnect', (room) => handleDisconnection(socket, room))
	socket.on('play_card', (card) => handlePlayCard(socket, card))
	socket.on('play_game', (room) => handlePlayGame(socket, room))
	socket.on('next_round', (room) => handleNextRound(socket, room))
	socket.on('round_finished', (room) => getUserStatus(socket, room))
}

const handleNextRound = (socket, room) => {
	try {
		const roomId = room.id
		const whites = rooms_data.getWhiteCardsPlayer(roomId)
		const blackCard = rooms_data.getBlackCard(roomId)
		getUserStatus(socket, roomId)
		socket.emit('next_card_array', whites)
		io.to(roomId).emit('next_black_card', blackCard)
	} catch (err) {
		console.warn(err)
	}
}

const getUserStatus = (socket, roomId) => {
	rooms_data.setZar(roomId)
	const nRoom = rooms_data.getRoomById(roomId)
	const players = rooms_data.getPlayersByRoomId(nRoom.id)
	const player = players.find((p) => p.id == socket.id)
	const newUserStatus = {
		points: player.points,
		isZar: player.isZar,
	}
	socket.emit('user_status', newUserStatus)
}

const handlePlayGame = (socket, room) => {
	//console.log(room)
	const roomId = room.id
	io.to(roomId).emit('play_room', room)
}

const newConnection = (socket, playerName, roomId) => {
	console.log('newConnection roomid')
	console.log(roomId)
	const newUser = {
		name: playerName,
		id: socket.id,
		points: 0,
		isZar: false,
	}
	let myRoom
	if (roomId) {
		myRoom = rooms_data.connectToRoom(newUser, roomId)
	} else {
		myRoom = rooms_data.createRoom(newUser)
	}

	socket.join(myRoom.id)
	updateRoom(myRoom)
}

// handlePlayCard => agrega la card al set de cartas jugadas en esta ronda.
// NO SE ENCARGA de mandar las cartas con la ronda terminada

const handlePlayCard = (socket, card) => {
	console.log(card)
}

const handleDisconnection = (socket, room) => {
	rooms_data.deletePlayerOfRoom(socket.id)
}

const updateRoom = (room) => {
	console.log('updateRoom roomid')
	console.log(room.id)
	io.to(room.id).emit('update_room', room)
}

server.listen(port, () => console.log(`Listening on port ${port}`))
