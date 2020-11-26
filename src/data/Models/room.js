const { getWhiteCards, getBlackCards } = require('../db_cards')

const room = {
	id: '',
	players: [],
	whiteCards: getWhiteCards(),
	blackCards: getBlackCards(),
	//rounds: [],
	//winner: {},
}

const newRoom = () => {
	return { ...room }
}

module.exports = { newRoom }
