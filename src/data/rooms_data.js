const { newRoom } = require('./Models/room')
const rooms = []

// helpers
const createUID = () => {
	return Math.floor(Math.random() * 999)
}

// finders
const getAllRooms = () => {
	return rooms
}

const getRoomById = (roomId) => {
	try {
		const currentRoom = getRoomIndexById(roomId)
		if (currentRoom === -1) {
			throw new Error()
		}
		return rooms[currentRoom]
	} catch (err) {
		console.warn(err)
	}
}

const getRoomIndexById = (roomId) => {
	return rooms.findIndex((room) => room.id == roomId)
}

const getPlayersByRoomId = (roomId) => {
	const myRoom = getRoomById(roomId)
	return myRoom.players
}

const getPlayerOfRoomById = (playerId, fn) => {
	try {
		rooms.forEach((room, iRoom) => {
			room.players.forEach((player, iPlayer) => {
				if (player.id == playerId) {
					fn(room, player, iRoom, iPlayer)
					return true
				}
			})
		})
	} catch (err) {
		console.warn(err)
	}
	return false
}

const createRoom = (player) => {
	const myRoom = newRoom()
	myRoom.id = createUID()
	myRoom.players.push(player)
	rooms.push(myRoom)
	return myRoom
}

const connectToRoom = (player, roomId) => {
	const myRoom = getRoomById(roomId)
	myRoom.players.push(player)
	return myRoom
}

const deletePlayerOfRoom = (playerId) => {
	getPlayerOfRoomById(playerId, (room, _p, _iR, iPlayer) => {
		room?.players.splice(iPlayer, 1)
	})
}

const setZar = (roomId) => {
	let valid = isValidGame(roomId)
	while (valid) {
		const myRoom = getRoomById(roomId)
		const players = rooms[myRoom].players
		for (let i = 0; i < players.length; i++) {
			players[i].isZar = true
		}
		players.foreach((p) => (p.isZar = false))
		valid = isValidGame(roomId)
	}
}



const isValidGame = (roomId) => {
	const isValid = true

	const myRoom = getRoomById(roomId)
	const players = myRoom.players

	if (players.length < CONST.MIN_PLAYERS) {
		console.log('El minimo de jugadores debe ser ' + CONST.MIN_PLAYERS)
		isValid = false
	}
	if (players.length > CONST.MAX_PLAYERS) {
		console.log('El maximo de jugadores debe ser ' + CONST.MAX_PLAYERS)
		isValid = false
	}
	
	return isValid
	
}





module.exports = {
	createRoom,
	getAllRooms,
	getRoomById,
	getPlayersByRoomId,
	getPlayerOfRoomById,
	deletePlayerOfRoom,
	connectToRoom,
	setZar,
}
