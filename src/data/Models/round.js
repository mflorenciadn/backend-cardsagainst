const round = {
	cards: [],
	winner: {}
}

const newRound = () => {
	return { ...round }
}

module.exports = { newRound }
