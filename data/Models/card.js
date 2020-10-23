const cards = require('../cardsArray');
console.log('Hola');

class Card {
    constructor(color) {
      this.color = color;
      this.used = false;
    }
}


const mycard = new Card('white');
console.log(mycard);
  

module.exports = { Card };