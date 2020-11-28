const { getWhiteCards, getBlackCards } = require('../cards_data')

const room = {
	id: '',
	players: [],
	whiteCards: getWhiteCards(),
	blackCards: getBlackCards(),
	rounds: [],
	//winner: {},
}

const newRoom = () => {
	return { ...room }
}

module.exports = { newRoom }
