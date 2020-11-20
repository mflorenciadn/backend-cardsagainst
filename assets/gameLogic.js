const CONST = require('./constants');
const cards = require('../data/db_cards');
const player = require('../data/Models/player');
const room = require('../data/Models/room');
const round = require('../data/Models/round');
const turn = require('../data/Models/turn');
const rooms = require( '../utils/rooms')

function gameControl() {
    const gameRoom = createRoom('1234');
    const testPlayer1 = createPlayer('Pepe', '1234');
    const testPlayer2 = createPlayer('Pepi', '1234');
    const testPlayer3 = createPlayer('Coqui', '1234');
    const testPlayer4 = createPlayer('Coco', '1234');
  
    rooms.push(gameRoom);

//     let gameRounds = gameRoom.rounds;

    for(let i = 0; i < CONST.MAX_ROUNDS; i++){
        const zar = gameRoom.players[i];
        zar.isZar = true;
        const actualRound = createRound(gameRoom);
        gameRounds.push(actualRound);
    }    
    gameRoom.winner = calculateGameWinner();
}

function checkRooms(id){
    return rooms.some(room => room.id === id)
}


function createTurn(player){
    const myTurn = new turn.Turn(player);

    if (player.isZar) {
        console.log('Esto hace un zar');
    } else {
        console.log('Esto hacen los otros jugadores');
    }
}



function calculateGameWinner(players){
    const winner = {}
    players.sort((a, b) => {b.points-a.points});
    winner = players[0];

    return winner;
};

    
function calculateRoundWinner(id){
    const winner = {}
    //aca hay buscar al jugador con el id de quien eligio la carta que elige el zar
    return winner;
}


function selectCard(color) { 
    let selected = null;

    if(color === 'white'){
        selected =  random(cards.whiteCards)
    }
    else 
    {
        selected = random(cards.blackCards);   
    }
    
    return selected;
}


function random(array){
    const random = Math.floor(Math.random()*(array.length - 1));
    const select = array[random];

    return select;
}
 



module.exports = {createTurn, random, selectCard, calculateGameWinner, calculateRoundWinner, rooms, checkRooms};


