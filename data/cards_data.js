const cardsContent = require('./cardsContent')
const card = require('./Models/card')

const whiteContent = cardsContent.whiteContent
const blackContent = cardsContent.blackContent


getWhiteCards = () => {
    const cards = []

    for(i=0; i < whiteContent.length; i++){
        const whiteCard = new card.Card ('white');
        whiteCard.id = i+1;
        whiteCard.content = whiteContent[i];
        cards.push(whiteCard);
    }
    return cards;
}


getBlackCards = () => {
    const cards = []

    for(i=0; i < blackContent.length; i++){
        const blackCard = new card.Card ('black');
        blackCard.id = i+1;
        blackCard.content = blackContent[i];
        cards.push(blackCard);
    }
    return cards;
}

const blackCards = getBlackCards();
const whiteCards = getWhiteCards();


module.exports = { blackCards, whiteCards }; 
