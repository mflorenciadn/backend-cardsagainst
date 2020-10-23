const cards = require('../data/cardsArray');

function selectCard(color) { 
    let selected = '';

    if(color === 'white'){
        selected = random(cards.whiteContent); 
    }
    else 
    {
        selected = random(cards.blackContent);   
    }


    return selected;
}

function random(array){
    const random = Math.floor(Math.random()*(array.length));
    select = array[random];

    return select;
}


let selected = selectCard('white');
console.log(selected);
