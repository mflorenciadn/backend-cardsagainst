const cloneDeep = require('lodash/cloneDeep')
const round = {
	cards: [],
	winner: {},
}

const newRound = () => {
	return cloneDeep(round)
}

module.exports = { newRound }
