class Round {
	constructor(roomId, players) {
		this.roomId = roomId
		this.players = players
		this.winner = {}
	}
}

module.exports = { Round }
