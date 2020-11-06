const MAX_ROUNDS = require('./constants');
const MIN_PLAYERS = require('./constants');
const MAX_PLAYERS = require('./constants');
const NUM_CARDS = require('./constants');
const cards = require('../data/cardsArray');
const player = require('../data/Models/player');
const room = require('../data/Models/room');
const round = require('../data/Models/round');
const turn = require('../data/Models/turn');

let rooms = [];

// function gameControl() {
    
//     let gameRoom = createRoom('1234');
//     let testPlayer1 = createPlayer('Pepe', '1234');
//     let testPlayer2 = createPlayer('Pepi', '1234');
//     let testPlayer3 = createPlayer('Coqui', '1234');
//     let testPlayer4 = createPlayer('Coco', '1234');
    
//     console.log(gameRoom);
//     //if(room.players.length() >= MIN_PLAYERS && room.players.length() <= MAX_PLAYERS){
//     rooms.push(gameRoom);

//     let gameRounds = gameRoom.rounds;

//     for(let i = 0; i < MAX_ROUNDS; i++){
//         actualRound = createRound(gameRoom);
//         gameRounds.push(actualRound);
//     }    
//     gameRoom.winner = calculateGameWinner();
// }

function checkRooms(id){
    return rooms.some(room => room.id === id)
}

function createRoom(roomId){
    const myRoom = new room.Room(roomId);
    rooms.push(myRoom);
    return myRoom;
}

function createRound(myRoom) {
    const myRound = new round.Round();
    myRound.roomId = myRoom.id;

    let players = myRoom.players;
    let num = players.indexOf(random(players));

    let zar = players[num];
    myRound.zar = zar;
    zar.role = 'zar';
    let otherPlayers = players.map(p => players.indexOf(p) !== num ); //esto no esta bien, devuelve bool en vez de los objetos

    createTurn(zar);

    otherPlayers.forEach(() => {
        createTurn(player);
    });

    round.winner = calculateRoundWinner();

    return myRound;
}

function createTurn(player){
    if (player.role == 'zar') {
        console.log('Esto hace un zar');
        console.log(selectCard('black'));
     
    } else {
        console.log('Esto hacen los otros jugadores');
        for (let j = 0; j < NUM_CARDS; j++){
            console.log(selectCard('white'));
        }
    }
}

function createPlayer(id, name, roomId){
    const myPlayer = new player.Player(id, name, roomId);
    let myRoom = rooms.find(room => room.id === roomId);
    if(myRoom != undefined)
    { 
        myRoom.players.push(myPlayer);
    }
    else
    {
        myRoom = createRoom(roomId)
        myRoom.players.push(myPlayer);
    }
    // console.log(myPlayer)
    // console.log(rooms)
    return myPlayer;
}
        

function calculateGameWinner(){
    console.log('Aca se calcula quien es el ganador del juego');
}
    
function calculateRoundWinner(){
    console.log('Aca se calcula quien es el ganador de la ronda');
}


function selectCard(color) { 
    let selected = '';

    if(color === 'white'){
        selected = random(cards.whiteContent); 
    }
    else 
    {
        selected = random(cards.blackContent);   
    }
    return selected;
}

function random(array){
    const random = Math.floor(Math.random()*(array.length - 1));
    select = array[random];

    return select;
}



//let selected = selectCard('white');
//console.log(selected);

//console.log(gameControl());



module.exports = {createRoom, createPlayer, createRound, createTurn, random, selectCard, calculateGameWinner, calculateRoundWinner, rooms, checkRooms};


