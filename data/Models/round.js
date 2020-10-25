class Round {
    constructor(roomId) {
        this.roomId = roomId;
        this.zar = {};
        this.players = [];
        this.winner = {};
    }
}

module.exports = { Round };