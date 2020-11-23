const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const roomsData = require('./data/rooms_data')

const app = express()
const port = process.env.PORT || 4001
const server = http.createServer(app)
const io = socketIo(server)

io.on('connect', (newSocket) => {
	subscribeToCao(newSocket)
})

let socket
let roomId

const subscribeToCao = (newSocket) => {
	socket = newSocket
	socket.on('newConnection', (player, id) => newConnection(player, id))
	socket.on('getPlayersByRoomId', getPlayers)
	socket.on('newPlayer', getPlayerList)
	socket.on('disconnect', handleDisconnection)
}

const newConnection = (player, currRoomId) => {
	let myRoom
	if (currRoomId) {
		myRoom = roomsData.connectToRoom(player, currRoomId)
	} else {
		myRoom = roomsData.createRoom(player)
	}
	roomId = myRoom.roomId
	socket.emit('joinRoom', myRoom)
	socket.join(myRoom.id)
}

const getPlayers = () => {
	const myPlayers = roomsData.getPlayersByRoomId(roomId)
	socket.emit('updatePlayers', myPlayers)
}

const getPlayerList = () => {
	socket.emit('playerList', roomsData.getPlayersByRoomId(roomId))
}
//const subscribeToPlayers = () => {
//const myPlayers = dataPlayers.getTotalPlayers()
//socket.emit('updatePlayers', myPlayers)
//}

const handleDisconnection = () => {
	//dataPlayers.deletePlayerById(socket.id)
}

server.listen(port, () => console.log(`Listening on port ${port}`))
