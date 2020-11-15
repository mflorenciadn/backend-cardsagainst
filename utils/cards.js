const gameLogic = require('../assets/gameLogic')

const usedBlack = []
const usedWhite = []

const getWhiteCardsPlayer = () => {
    const whiteCardsPlayer= [];
    
    for(let i=0; i < 10; i++) {
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

module.exports = { getWhiteCardsPlayer }; 

