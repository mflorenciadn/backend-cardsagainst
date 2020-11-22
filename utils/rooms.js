const gameLogic = require('../assets/gameLogic')
const playersLogic = require('./players')
const CONST = require('../assets/constants')

const createRoom = (roomId) => {
    const myRoom = new room.Room(roomId);
    rooms.push(myRoom);
    return myRoom;
}

const playGame = (myRoom) => {
    
    const validGame = isValidGame();

    while (validGame) {
        for(let i = 0; i < CONST.MAX_ROUNDS; i++){
            validGame = isValidGame();
            const players = myRoom.players;

            if (validGame) {
                if (i < players.length) {
                    players[i].isZar = true;
                }
                else {
                    players[i-myRoom.players.length]
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

    }
}

const createRound = id => {
    const myRoom =  rooms.find((item) => item.id === id)
    //const players = myRoom.players;
    const myRound = new round.Round(id);
    console.log(myRound)

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
    else if (myRoom.players.length < CONST.MIN_PLAYERS) {
        console.log('El minimo de jugadores debe ser ' + CONST.MIN_PLAYERS)
        isValid = false;
    }
    else if (myRoom.players.length > CONST.MAX_PLAYERS) {
        console.log('El maximo de jugadores debe ser ' + CONST.MAX_PLAYERS)
        isValid = false;
    }
    //averiguar si socket rooms permite fijar limites
}

const refreshPlayers = (id) => {
    return playersLogic.getRoomUsers(id);
}

const listRooms = () => {
    return rooms.forEach(r => console.log(r))
}

module.exports = { createRoom, createRound, refreshPlayers, isValidGame, playGame, initRoom, listRooms }, rooms 
