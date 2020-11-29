const { getWhiteCards, getBlackCards } = require('../cards_data')
const cloneDeep = require('lodash/cloneDeep')

const room = {
	id: '',
	players: [],
	whiteCards: getWhiteCards(),
	blackCards: getBlackCards(),
	rounds: [],
	//winner: {},
}

const newRoom = () => {
	return cloneDeep(room)
}

module.exports = { newRoom }
