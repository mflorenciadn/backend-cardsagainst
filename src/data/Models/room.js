const room = {
	id: '',
	players: [],
	rounds: [],
	winner: {},
}

const newRoom = () => {
	return Object.create(room)
}

module.exports = { newRoom }
