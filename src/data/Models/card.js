const clone = require('lodash/clone')
const card = {
	id: null,
	content: '',
	isBlack: false,
	used: false,
	playedBy: '',
}

const newCard = () => {
	return clone(card)
}

module.exports = { newCard }
