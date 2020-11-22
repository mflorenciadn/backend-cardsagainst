const gameLogic = require('../assets/gameLogic')
const rooms = require('../utils/rooms');
const player = require('../data/Models/player')
const players = [];


const createPlayer = (id, name) => {
    return new player.Player(id, name)
}

const playerJoin = (player, room) => {
    player.roomId = room.id
    room.players.push(player);
    return room;
}

const getCurrentPlayer = (socketId) =>{
    let current = players.find((item) => item.id === socketId)
    return current;
}

const playerLeave = (socketId) => {
    const index = players.findIndex(player => player.id === socketId);
    if(index != -1)
    {
        const newArray = players.splice(index, 1);
        console.log(newArray[0]);
        return newArray[0];
    }
}

const getRoomUsers = (roomId) => {
    return players.filter(player => player[roomId] === roomId)
}

module.exports = {
    createPlayer,
    playerJoin,
    getCurrentPlayer,
    playerLeave,
    getRoomUsers,   
}