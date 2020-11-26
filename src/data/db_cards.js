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


module.exports = { getBlackCards, getWhiteCards }
