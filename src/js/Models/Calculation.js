import { state } from '../index';
import * as rules from '../rules';

const highestBet = () => {
    return state.bets.slice(-1)[0] ;
};

const possibleBets = () => {
    const diceLeft = state.players.map(el => el.handSize).reduce((a, b) => a + b);
    const bets = [];
    // while (quantity <= diceLeft)
};

const factorise = n => {
    var fact = 1;
    for (var i = 2; i <= n; i++)
        fact = fact * i;
    return fact;
}