const clone = require('lodash/clone')
const player = {
	id: '',
	name: '',
	roomId: '',
	points: 0,
	isZar: false,
}

const newPlayer = () => {
	return clone(player)
}

module.exports = { newPlayer }
