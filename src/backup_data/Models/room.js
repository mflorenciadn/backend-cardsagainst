class Room {
	constructor(roomId) {
		this.id = roomId
		this.players = []
		this.rounds = []
		this.winner = {}
	}
}

module.exports = { Room }
