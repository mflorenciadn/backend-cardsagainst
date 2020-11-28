const card = {
	id: null,
	content: '',
	isBlack: false,
	used: false,
	playedBy: ''
}

const newCard = () => {
	return { ...card }
}

module.exports = { newCard }
