const gameLogic = require('../assets/gameLogic')
const playersLogic = require('./players')
const CONST = require('../assets/constants')
const room = require('../data/Models/room')
const round = require('../data/Models/round')
const myRooms = [];

const createRoom = (roomId) => {
    const myRoom = new room.Room(roomId);
    console.log(room.Room)
    myRooms.push(myRoom);
    console.log(myRooms)
    return myRoom;
}

const initRoom = (roomId) => {
    if(myRooms.find((item) => item.id === roomId) != undefined)
    {
        return myRooms.find((item) => item.id === roomId)
    }
    else
    {
        const room = gameLogic.createRoom(roomId)
        myRooms.push(room);
        return room;
    }
}

const playGame = (myRoom) => {
    
    const validGame = isValidGame(myRoom);

    while (validGame) {
        for(let i = 0; i < CONST.MAX_ROUNDS; i++){
            validGame = isValidGame(myRoom);
            const players = myRoom.players;

            if (validGame) {
                if (i < players.length) {
                    players[i].isZar = true;
                }
                else {
                    players[i-myRoom.players.length].isZar = true;
                }
                const round = gameLogic.createRound(myRoom.id);
                myRoom.rounds.push(round)
                players.foreach(p => p.isZar= false)
            }
        }
    
        myRoom.winner = gameLogic.calculateGameWinner(myRoom.players)
    }
}

const playRound = () => {
    
    for(let i = 0; i < CONST.MAX_ROUNDS; i++){

}}

const createRound = (id) => {
    const myRoom =  myRooms.find((item) => item.id === id)
    console.log(myRoom)
    //const players = myRoom.players;
    const myRound = new round.Round(id);
    



    // players.forEach(() => {
    //     createTurn(player);
    // });

    // round.winner = calculateRoundWinner();
    //myRoom.rounds.push(myRound)
    return myRound;
    }





const isValidGame = (myRoom) => {
    const isValid = true; 
    myRoom.players = refreshPlayers(myRoom.id)

    if (myRoom.rounds.length > CONST.MAX_ROUNDS){
        console.log('Rondas maximas alcanzadas. Fin del juego')
        isValid = false;
    } 
    if (!myRoom.winner){
        console.log('El ganador es: ' + myRoom.winner)
        isValid = false;
    }
    else if (myRoom.players.length < CONST.MIN_PLAYERS) {
        console.log('El minimo de jugadores debe ser ' + CONST.MIN_PLAYERS)
        isValid = false;
    }
    else if (myRoom.players.length > CONST.MAX_PLAYERS) {
        console.log('El maximo de jugadores debe ser ' + CONST.MAX_PLAYERS)
        isValid = false;
    }

    return isValid;
}

const refreshPlayers = (id) => {
    return playersLogic.getRoomUsers(id);
}

const getRooms = () => {
    console.log(myRooms)
    return myRooms;
}


module.exports = {
    createRoom,
    getRooms,
}
