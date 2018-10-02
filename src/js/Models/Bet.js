import { state } from '../index';

export default class Bet {
    constructor(playerID, quantity, value) {
        this.playerID = playerID;
        this.quantity = quantity;
        this.value = value;
    };

    isLegal() {
        let legal = true;
        if (isNaN(this.value) || isNaN(this.quantity)) {
            legal = false;
        } else if (state.bets !== undefined) {
            state.bets.forEach(el => {
                if (el.value > this.value ||
                    (el.value === this.value && el.quantity >= this.quantity)) {
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