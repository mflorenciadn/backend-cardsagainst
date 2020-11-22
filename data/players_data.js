const player=require("./Models/player")
const {getRoomByPlayerId} = require("./rooms_data")

const players = [];

//Create
const createPlayer = (id, name) => {
    const myPlayer = new player.Player(id, name)
    players.push(myPlayer)
}

//get list
const getTotalPlayers = () => {
    return players
}

const getPlayerById = playerId => {
    return players.find(player => player.id == playerId)
}

const getPlayersByRoomId = roomId => {
    return players.filter(player => player.roomId == roomId)
}


const updatePlayer = room => {
 //
}

//delete
const deletePlayerById = playerId => {
    const myPlayer = players.find(player => player.id == playerId)
    players.filter(player => player.id !== myPlayer.id)

    roomToChange = getRoomByPlayerId(playerId);
}

const getPlayerName = id => {
    const myPlayer = players.find(player => player.id == playerId)
    return myPlayer.name;
}


module.exports = {
    createPlayer,
    getTotalPlayers,
    getPlayerById,
    getPlayersByRoomId,
    deletePlayerById,
    getPlayerName,
}
