import { state } from '../index';
import * as rules from '../rules';

export default class Bet {
    constructor(playerID, quantity, value, probability = 1) {
        this.playerID = playerID;
        this.quantity = parseInt(quantity);
        this.value = parseInt(value);
        this.probability = probability;
    };

    isLegal() {
        let legal = true;
        if (isNaN(this.value) || isNaN(this.quantity)) {
            legal = false;
        } else if (state.bets !== undefined) {
            state.bets.forEach(el => {
                if (el.value > this.value ||
                    (el.value === this.value && el.quantity >= this.quantity) ||
                    (el.value > rules.maxDieValue) ||
                    (el.quantity > state.diceInPlay())) {
                    legal = false;
                };
            });
        };
        this.legal = legal;
        if (this.legal) state.bets.push(this);
        return this.legal;
    };

    isValid() {
        this.valid = false;
        const allHands = state.players.map(el => el.hand).reduce((acc, curr) => acc.concat(curr), []);
        const rollCounts = {};
        allHands.forEach(el => {
            rollCounts[el] = (rollCounts[el] || 0) + 1;
        });
        if (rollCounts[this.value] >= this.quantity) this.valid = true;
        return this.valid;
    };
};