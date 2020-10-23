const cards = require('../data/cardsArray');
const player = require('../data/Models/player');
const room = require('../data/Models/room');
const round = require('../data/Models/round');

const rooms = [];

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
    const random = Math.floor(Math.random()*(array.length));
    select = array[random];

    return select;
}

function createRoom(roomId){
    const myRoom = new room.Room(roomId);
    rooms.push(myRoom);
    return myRoom;
}

function createPlayer(name, roomId){
    const myPlayer = new player.Player(name, roomId);
    const myRoom = rooms.find(room => room.id === roomId);
    myRoom.players.push(myPlayer);
    return myPlayer;
}


function createPlay(room) {
    if(room.player.length() >= MIN_PLAYERS && room.player.length() <= MAX_PLAYERS){
        if(room.rounds <= MAX_ROUNDS){
            createRound(room.id);
            room.rounds++;
        }
    } else {
        //.....
  }
}

function createRound(roomId) {
    const myRound = new round.Round('1234');
    console.log(myRound);
    const myRoom = rooms.find(room => room.id === roomId);
    console.log(myRoom);
    //myRound.zar = random(myRoom.players);
    //console.log(zar);
    //......
    return myRound;
}

//let selected = selectCard('white');
//console.log(selected);


let testRoom= createRoom('1234');
console.log(testRoom);
let testPlayer = createPlayer('Pepe', '1234');
console.log(testPlayer);
console.log(testRoom);

console.log(rooms);






