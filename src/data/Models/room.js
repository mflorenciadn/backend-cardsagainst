const room = {
	id: '',
	players: [],
	rounds: [],
	winner: {},
}

const newRoom = () => {
	return { ...room }
	//return Object.assign({}, room)
}

module.exports = { newRoom }
