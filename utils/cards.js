const gameLogic = require('../assets/gameLogic')
const CONST = require('../assets/constants')

const usedBlack = []
const usedWhite = []

const getWhiteCardsPlayer = () => {
    const whiteCardsPlayer= [];
    
    for(let i=0; i < CONST.NUM_CARDS; i++) {
        const whiteCard= gameLogic.selectCard('white')

        if(!whiteCard.used){
            whiteCardsPlayer.push(whiteCard)
            whiteCard.used = true
            usedWhite.push(whiteCard)
        }
        else
        {
            i--
        }
    }
    return whiteCardsPlayer;
  
}

const getBlackCard = () => {
    const blackCard= gameLogic.selectCard('black')
    let empty = true;

    while (empty === true){
        if(!blackCard.used){
            blackCard.used = true;
            usedBlack.push(blackCard);
            empty = false;
        }
        else {
            blackCard= gameLogic.selectCard('black')
        }
    }  
    return blackCard;
}

const chooseCard = (id) => {

}

module.exports = { getWhiteCardsPlayer, getBlackCard, usedBlack, usedWhite}; 

