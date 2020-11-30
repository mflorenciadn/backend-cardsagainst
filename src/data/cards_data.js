const CONST = require('../assets/constants')
const fs = require('fs')
const path = require('path')
const { newCard } = require('./Models/card')
const rawCards = fs.readFileSync(path.join(__dirname + '/../cards.json'))
const cardsArray = JSON.parse(rawCards)

const getWhiteCards = () => {
	const cards = []

	cardsArray.whiteCards.forEach((card, i) => {
		const nCard = newCard()
		nCard.id = i
		nCard.content = card
		cards.push(nCard)
	})

	return cards
}

const getBlackCards = () => {
	const cards = []

	cardsArray.blackCards.forEach((card, i) => {
		const nCard = newCard()
		nCard.id = i
		nCard.content = card
		nCard.isBlack = true
		cards.push(nCard)
	})

	return cards
}


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

function selectCard(color) {
	let selected = null

	if (color === 'white') {
		selected = random(getWhiteCards)
	} else {
		selected = random(getBlackCards)
	}

	return selected
}

function random(array) {
	const random = Math.floor(Math.random() * (array.length - 1))
	const select = array[random]

	return select
}


module.exports = { getWhiteCards, getBlackCards, getWhiteCardsPlayer, getBlackCard }
