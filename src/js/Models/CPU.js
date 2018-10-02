import Player from './Player';
import * as rules from '../rules';
import * as calculation from './Calculation';

export default class CPU extends Player {
    constructor(id, name) {
        super(id, name);
        this.hand = [];
        this.handSize = rules.maxHandSize;
        this.cpu = true;
    };

    rollDice() {
        this.hand = this.roll(this.handSize);
        this.modifierHand = this.roll(rules.difficultyModifier);
        return this.hand;
    };

    placeBet() {

        // Probability of x number of the dice that I do not know about being equal to or higher than the bet value minus the quantity that I do know about
        


        // numberOfDice = players(handsize).sum + difficultyModifier

        // create array of bets to choose from

        // select the most probable bet using values from this.hand and this.modifierHand


    };
};