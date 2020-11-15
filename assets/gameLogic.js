const CONST = require('./constants');
const cards = require('../data/db_cards');
const player = require('../data/Models/player');
const room = require('../data/Models/room');
const round = require('../data/Models/round');
const turn = require('../data/Models/turn');

let rooms = [];

function gameControl() {
    const gameRoom = createRoom('1234');
    const testPlayer1 = createPlayer('Pepe', '1234');
    const testPlayer2 = createPlayer('Pepi', '1234');
    const testPlayer3 = createPlayer('Coqui', '1234');
    const testPlayer4 = createPlayer('Coco', '1234');
  
    rooms.push(gameRoom);

    let gameRounds = gameRoom.rounds;

    for(let i = 0; i < CONST.MAX_ROUNDS; i++){
        const zar = gameRoom.players[i];
        zar.isZar = true;
        const actualRound = createRound(gameRoom);
        gameRounds.push(actualRound);
    }    
    gameRoom.winner = calculateGameWinner();
}


function createRoom(roomId){
    const myRoom = new room.Room(roomId);
    rooms.push(myRoom);
    return myRoom;
}

function createRound(myRoom) {
    const myRound = new round.Round();
    myRound.roomId = myRoom.id;

    const players = myRoom.players;

    players.forEach(() => {
        createTurn(player);
    });

    round.winner = calculateRoundWinner();

    return myRound;
}

function createTurn(player){

    if (player.isZar) {
        console.log('Esto hace un zar');
        console.log(selectCard('black'));
     
    } else {
        console.log('Esto hacen los otros jugadores');
        for (let j = 0; j < CONST.NUM_CARDS; j++){
            console.log(selectCard('white'));
        }
    }
}

function createPlayer(name, roomId){
    const myPlayer = new player.Player(name, roomId);
    const myRoom = rooms.find(room => room.id === roomId);
    myRoom.players.push(myPlayer);
    return myPlayer;
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
 

module.exports = { random, selectCard, createPlayer, createRound, createRoom, calculateGameWinner}; 







