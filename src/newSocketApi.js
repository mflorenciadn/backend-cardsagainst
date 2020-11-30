const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const rooms_data = require('./data/rooms_data')
const { POINTS_WINNER } = require('./assets/constants')

const app = express()
const port = process.env.PORT || 3000
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
	socket.on('play_card', (room, card) => handlePlayCard(socket, room, card))
	socket.on('play_game', (room) => handlePlayGame(socket, room))
	socket.on('next_round', (room) => handleNextRound(socket, room))
	socket.on('round_finished', (room, card) =>
		handleRoundFinished(socket, room, card)
	)
}


const handleRoundFinished = (socket, room, card) => {
	const myRoom = rooms_data.getRoomById(room.id)
	const players = myRoom.players
	const winnerId = card.playedBy
	const winner = players.find((p) => p.id == winnerId)
	winner.points = winner.points + 1
	const isValid = rooms_data.isValidGame(myRoom.id)
	if (isValid) {
		try {
			let primero = myRoom.players.shift()
			myRoom.players.push(primero)
			myRoom.players.forEach((player, i) => {
				console.log(player, i)
			})
			updateRoom(myRoom)
			io.to(myRoom.id).emit('new_round', myRoom)
		} catch (err) {
			console.warn(err)
		}
	} else {
		const winner = players.find((p) => p.points == POINTS_WINNER)
		io.to(myRoom.id).emit('show_winner', winner)
	}
}

const handleNextRound = (socket, room) => {
	try {
		const myRoom = getUserStatus(socket, room)
		const players = myRoom.players
		const zar = players.find((p) => p.isZar == true)
		if (socket.id == zar.id) {
			rooms_data.createRound(myRoom.id)
			const blackCard = rooms_data.getBlackCard(myRoom.id)
			io.to(myRoom.id).emit('next_black_card', blackCard)
			updateRoom(myRoom)
		} else {
			const whites = rooms_data.getWhiteCardsPlayer(myRoom.id)
			socket.emit('next_card_array', whites)
		}
	} catch (err) {
		console.warn(err)
	}
}

const getUserStatus = (socket, room) => {
	const myRoom = rooms_data.setZar(room)
	const player = myRoom.players.find((p) => p.id == socket.id)
	const newUserStatus = {
		points: player.points,
		isZar: player.isZar,
		round: room.rounds.length + 1,
	}
	socket.emit('user_status', newUserStatus)
	return myRoom
}

const handlePlayGame = (socket, room) => {
	let roomId = room.id
	io.to(roomId).emit('play_room', room)
}

const newConnection = (socket, playerName, roomId) => {
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

const handlePlayCard = (socket, room, card) => {
	const roomId = room.id
	const playerId = socket.id
	rooms_data.submitCard(roomId, card, playerId)
	io.to(roomId).emit('submit_card', card)
}

const handleDisconnection = (socket, room) => {
	rooms_data.deletePlayerOfRoom(socket.id)
}

const updateRoom = (room) => {
	io.to(room.id).emit('update_room', room)
}

const subscribeToKeepAlive = () => {
	const intervalId = setInterval(() => {
	  io.emit("hi");
	  console.log("keep alive sent :)");
	}, 900000);
	return intervalId;
  };

server.listen(port, () => console.log(`Listening on port ${port}`))
