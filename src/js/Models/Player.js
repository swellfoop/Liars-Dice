import * as rules from '../rules';
import Bet from './Bet';

export default class Player {
    constructor(id, name, cpu) {
        this.id = id;
        this.name = name;
        this.cpu = cpu;
        this.hand = [];
        this.handSize = rules.maxHandSize;
    };

    rollDice() {
        this.hand = roll(this.handSize);

        // Roll extra dice to choose from for an easier AI
        if (this.cpu) {
            this.modifierHand = roll(rules.difficultyModifier);
        } else {
            // console.log(this.hand);
        };
        
        return this.hand;
    };

    placeBet(quantity, value) {
        const bet = new Bet(this.id, quantity, value);
        if (bet.isLegal()) this.bet = bet;
        return this.bet;
    };

    loseRound() {
        this.handSize = this.handSize - 1;
        if (this.handSize < 1) return true;
    }
};

const roll = handSize => {
    const arr = [];
    let roll;
    for (let i = 0; i < handSize; i++) {
        roll = Math.ceil(Math.random() * rules.maxDieValue);
       arr.push(roll);
    };
    return arr;
};