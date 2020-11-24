const { newRoom } = require('./Models/room')
const gameLogic = require('../assets/gameLogic')
const CONST = require('../assets/constants')
const rooms = []

// helpers
const createUID = () => {
	return 'room-' + Math.floor(Math.random() * 999999)
}

// finders
const getAllRooms = () => {
	return rooms
}

const getRoomById = (roomId) => {
	return rooms.find((room) => room.Id == roomId)
}

const getRoomIndexById = (roomId) => {
	return rooms.findIndex((room) => room.Id == roomId)
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
	const currentRoom = getRoomIndexById(roomId)
	rooms[currentRoom].players.push(player)
	return rooms[currentRoom]
}

const deletePlayerOfRoom = (playerId) => {
	getPlayerOfRoomById(playerId, (room, _p, _iR, iPlayer) => {
		room?.players.splice(iPlayer, 1)
	})
}


/////////// Cards
const getWhiteCardsPlayer = () => {
    const whiteCardsPlayer= [];
    
    for(let i=0; i < CONST.NUM_CARDS; i++) {
        const whiteCard= gameLogic.selectCard('white')

        if(!whiteCard.used){
            whiteCardsPlayer.push(whiteCard)
            whiteCard.used = true
            usedWhite.push(whiteCard)
        }
        else
        {
            i--
        }
    }
    return whiteCardsPlayer;
  
}

const getBlackCard = () => {
    const blackCard= gameLogic.selectCard('black')
    let empty = true;

    while (empty === true){
        if(!blackCard.used){
            blackCard.used = true;
            usedBlack.push(blackCard);
            empty = false;
        }
        else {
            blackCard= gameLogic.selectCard('black')
        }
    }  
    return blackCard;
}




module.exports = {
	createRoom,
	getAllRooms,
	getRoomById,
	getPlayersByRoomId,
	deletePlayerOfRoom,
	connectToRoom,
	getWhiteCardsPlayer,
	getWhiteCardsPlayer
}
