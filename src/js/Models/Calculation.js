import Bet from './Bet';
import { state } from '../index';
import * as rules from '../rules';

/*
const highestBet = () => {
    return state.bets.slice(-1)[0] ;
};
*/

export const possibleBets = (playerID, rollData) => {
    const diceInPlay = state.diceInPlay();
    const bets = [];
    for (let value = 1; value <= rules.maxDieValue; value++) {
        for (let quantity = 1; quantity <= diceInPlay; quantity++) {
            const prob = rollData[value] >= quantity ? 1 : probability(diceInPlay - rollData[value], quantity - rollData[value], rules.maxDieValue);
            bets.push(new Bet(playerID, quantity, value, prob));
        };
    };
    return bets;
};

export const probabilityOfBet = (bet, rollData, handSize) => {
    const diceInPlay = state.diceInPlay();
    const prob = rollData[bet.value] >= bet.quantity ? 1 : probability(diceInPlay - handSize, bet.quantity - rollData[bet.value], rules.maxDieValue);
    return prob;
};

const factorise = n => {
    var fact = 1;
    for (var i = 2; i <= n; i++) {
        fact = fact * i;
    };
    return fact;
};

const probability = (n, k, j) => {
    // n = limit
    // k = quantity
    // j = max value possible
    const decimalFactor = 100;
    const prob = Math.round((factorise(n) / (factorise(k) * factorise(n - k))) * Math.pow((1 / j), k) * Math.pow((j - 1) / j, (n - k)) * decimalFactor) / decimalFactor;
    return !prob ? 0 : prob;
};