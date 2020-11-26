const card = {
	id: null,
	content: '',
	isBlack: false,
	used: false,
}

const newCard = () => {
	return { ...card }
}

module.exports = { newCard }
