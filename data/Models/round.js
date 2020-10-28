class Round {
    constructor(roomId) {
        this.roomId = roomId;
        this.players = [];
        this.winner = {};
    }
}

module.exports = { Round };