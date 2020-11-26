const cardsContent = require('./cardsContent')
const card = require('./Models/card')
const CONST = require('../assets/constants')

const whiteContent = cardsContent.whiteContent
const blackContent = cardsContent.blackContent

const usedBlack = []
const usedWhite = []

const getWhiteCardsPlayer = () => {
	const whiteCardsPlayer = []

	for (let i = 0; i < CONST.NUM_CARDS; i++) {
		const whiteCard = selectCard('white')

		if (!whiteCard.used) {
			whiteCardsPlayer.push(whiteCard)
			whiteCard.used = true
			usedWhite.push(whiteCard)
		} else {
			i--
		}
	}
	return whiteCardsPlayer
}

const getBlackCard = () => {
	const blackCard = selectCard('black')
	let empty = true

	while (empty === true) {
		if (!blackCard.used) {
			blackCard.used = true
			usedBlack.push(blackCard)
			empty = false
		} else {
			blackCard = selectCard('black')
		}
	}
	return blackCard
}


getWhiteCards = () => {
	const cards = []

	for (i = 0; i < whiteContent.length; i++) {
		const whiteCard = new card.Card('white')
		whiteCard.id = i + 1
		whiteCard.content = whiteContent[i]
		cards.push(whiteCard)
	}
	return cards
}

getBlackCards = () => {
	const cards = []

	for (i = 0; i < blackContent.length; i++) {
		const blackCard = new card.Card('black')
		blackCard.id = i + 1
		blackCard.content = blackContent[i]
		cards.push(blackCard)
	}
	return cards
}

function selectCard(color) {
	let selected = null

	if (color === 'white') {
		selected = random(getWhiteCards())
	} else {
		selected = random(getBlackCards())
	}

	return selected
}

function random(array) {
	const random = Math.floor(Math.random() * (array.length - 1))
	const select = array[random]

	return select
}

const blackCards = getBlackCards()
const whiteCards = getWhiteCards()

module.exports = { blackCards, whiteCards, getWhiteCardsPlayer, getBlackCard }
