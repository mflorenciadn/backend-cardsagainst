//const cardsContent = require('./cardsContent')
const fs = require('fs')
//const card = require('../data/Models/card')

const rawCards = fs.readFileSync('../cards.json')
const cardsArray = JSON.parse(rawCards)

//const whiteContent = cardsArray.whiteCards
//const blackContent = cardsArray.blackCards

//const getWhiteCards = () => {
//const cards = []

//for (let i = 0; i < whiteContent.length; i++) {
//	const whiteCard = new card.Card('white')
//	whiteCard.id = i + 1
//	whiteCard.content = whiteContent[i]
//	cards.push(whiteCard)
//}
//return cardsArray.whiteCards
//}

//const getBlackCards = () => {
//const cards = []

//for (i = 0; i < blackContent.length; i++) {
//	const blackCard = new card.Card('black')
//	blackCard.id = i + 1
//	blackCard.content = blackContent[i]
//	cards.push(blackCard)
//}
//return cardsArray.blackCards
//}

const blackCards = cardsArray.blackCards
const whiteCards = cardsArray.whiteCards

module.exports = { blackCards, whiteCards }
