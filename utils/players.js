const gameLogic = require('../assets/gameLogic')
const {getRooms} = require('./rooms');
const player = require('../data/Models/player');
const players = [];

const playerJoin = (id, name, roomId) => {

    //const myRoom =  rooms.rooms.find((item) => item.id === id)
    //console.log(rooms.rooms)
    if(players.find((item) => item.id === socketId) != undefined)
    {
        return players.find((item) => item.id === socketId)
    }
    else
    {
        const player = createPlayer(id,name,roomId)
        players.push(player);
        //myRoom.players.push(player)
    
        return player;
    }
}

const createPlayer = (id, name, roomId) => {
    const myPlayer = new player.Player(id, name, roomId);
    console.log(getRooms)
    // let myRoom = rooms.myRooms.find(room => room.id === roomId);
    // if(myRoom != undefined)
    // { 
    //     myRoom.players.push(myPlayer);
    // }
    // else
    // {
    //     myRoom = createRoom(roomId)
    //     myRoom.players.push(myPlayer);
    // }
    // console.log(myPlayer)
    // console.log(rooms)
    return myPlayer;
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
    playerJoin,
    getCurrentPlayer,
    playerLeave,
    getRoomUsers,   
}