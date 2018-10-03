import * as rules from '../rules';
import Bet from './Bet';

export default class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.hand = [];
        this.handSize = rules.maxHandSize;
        this.cpu = false;
    };

    rollDice() {
        this.hand = this.roll(this.handSize);        
        return this.hand;
    };

    placeBet() {
        let quantity;
        let value;
        this.bet = {};
        this.bet.legal = false;
        while (!this.bet.legal) {
            quantity = prompt(`
                Your hand is ${this.hand}.\n
                Write your QUANTITY.
            `);
            value = prompt(`
                Your hand is ${this.hand}.\n
                Write your VALUE.`
            );
            const bet = new Bet(this.id, quantity, value);
            if (bet.isLegal()) this.bet = bet;
        };        
        return this.bet;
    };

    loseRound() {
        this.handSize = this.handSize - 1;
        if (this.handSize < 1) return true;
    };

    roll(handSize) {
        const arr = [];
        let roll;
        for (let i = 0; i < handSize; i++) {
            roll = Math.ceil(Math.random() * rules.maxDieValue);
           arr.push(roll);
        };
        return arr;
    };
};