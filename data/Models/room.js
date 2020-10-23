class Room {
    constructor(roomId, []) {  
        this.id = roomId;
        this.players = [];
        this.rounds = 0;
    }
}

module.exports = { Room };