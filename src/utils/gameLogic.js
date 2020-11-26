const sampleSize = require('lodash/sampleSize')
const constants = require('../assets/constants')

const getRandFromArray = (array) => {
	return array[Math.floor(Math.random() * array.length)]
}

const populateWhiteCardArray = (player, room) => {
	const playerTotWhiteCards = player?.whiteCards?.length
	const missingCards = constants.NUM_CARDS - playerTotWhiteCards
	const newCardsToDeliver = sampleSize(room.whiteCards, missingCards)
	newCardsToDeliver.forEach((card) =>
		room.whiteCards.filter((wCard) => wCard.id === card.id)
	)
	return newCardsToDeliver
}
