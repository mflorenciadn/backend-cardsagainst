const { getWhiteCards, getBlackCards } = require('../cards_data')

const room = {
	id: '',
	players: [],
	whiteCards: getWhiteCards(),
	blackCards: getBlackCards(),
	round: 0,
	//winner: {},
}

const newRoom = () => {
	return { ...room }
}

module.exports = { newRoom }
