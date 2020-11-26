const { newRoom } = require('./Models/room')
const CONST = require('../assets/constants')
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
	if(valid){
		const myRoom = getRoomById(roomId)
		const players = myRoom.players
		players[0].isZar = true
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
	else if (players.length > CONST.MAX_PLAYERS) {
		console.log('El maximo de jugadores debe ser ' + CONST.MAX_PLAYERS)
		isValid = false
	}
	else if (players.some(p => p.points==5)){
		console.log('alguien gano')
		isValid = false
	}

	
	return isValid
	
}

const getWhiteCardsPlayer = (roomId) => {
	const whiteCardsPlayer = []
	while(whiteCardsPlayer.length < CONST.NUM_CARDS){
		const whiteCard = selectCard('white', roomId)
		if (!whiteCard.used) {
			whiteCardsPlayer.push(whiteCard)
			whiteCard.used = true
		}
	}
	return whiteCardsPlayer
}

const getBlackCard = (roomId) => {
	let blackCard = selectCard('black', roomId)
	let empty = true

	while (empty === true) {
		if (!blackCard.used) {
			blackCard.used = true
			empty = false
		} else {
			blackCard = selectCard('black', roomId)
		}
	}
	return blackCard
}

function selectCard(color, roomId) {
	const myRoom = getRoomById(roomId)
	let selected = null

	if (color === 'white') {
		selected = random(myRoom.whiteCards)
	} else {
		selected = random(myRoom.blackCards)
	}

	return selected
}

function random(array) {
	const random = Math.floor(Math.random() * (array.length - 1))
	const select = array[random]

	return select
}



module.exports = {
	createRoom,
	getAllRooms,
	getRoomById,
	getPlayersByRoomId,
	getPlayerOfRoomById,
	getWhiteCardsPlayer,
	getBlackCard,
	deletePlayerOfRoom,
	connectToRoom,
	setZar,
}
