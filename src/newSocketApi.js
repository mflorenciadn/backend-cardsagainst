const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cards_data = require('./data/cards_data')
const roomsData = require('./data/rooms_data')


const app = express()
const port = process.env.PORT || 4001
const server = http.createServer(app)
const io = socketIo(server)

//const { getWhiteCards } = require('./data/db_cards')
//getWhiteCards()

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
}

const handleNextRound = (socket, room) => {
	let roomId = room.id
	let arr = cards_data.getWhiteCardsPlayer()
	let blackCard = cards_data.getBlackCard()
	socket.emit('next_card_array', arr)
	io.to(roomId).emit('next_black_card', blackCard)
}

const handlePlayGame = (socket, room) => {
	let roomId = room.id
	io.to(roomId).emit('play_room', room)
}

const newConnection = (socket, playerName, roomId) => {
	const newUser = {
		name: playerName,
		id: socket.id,
	}
	let myRoom
	if (roomId) {
		myRoom = roomsData.connectToRoom(newUser, roomId)
	} else {
		myRoom = roomsData.createRoom(newUser)
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
	roomsData.deletePlayerOfRoom(socket.id)
}

const updateRoom = (room) => {
	io.to(room.id).emit('update_room', room)
}

server.listen(port, () => console.log(`Listening on port ${port}`))
