const player = {
	id: '',
	name: '',
	roomId: '',
	points: 0,
	isZar: false,
}

const newPlayer = () => {
	return Object.create(player)
}

module.exports = { newPlayer }
