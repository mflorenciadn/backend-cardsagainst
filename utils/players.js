const gameLogic = require('../assets/gameLogic')
const players = [];

const playerJoin = (id, name, roomId) => {
    const player = gameLogic.createPlayer(id,name,roomId)
    
    players.push(player);
    console.log(players)
    return player;
}

const getCurrentplayer = (socketId) =>{
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
    playerJoin,
    getCurrentplayer,
    playerLeave,
    getRoomUsers
}