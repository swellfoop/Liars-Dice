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
        this.rollData = countRolls(this.hand.concat(this.modifierHand));
        this.betProbabilities = betProbabilities(this.id, this.rollData);
        
        return [this.hand, this.modifierHand, this.rollData, this.betProbabilities];
    };
    
    placeBet() {

        // Probability of x number of the dice that I do not know about being equal to or higher than the bet value minus the quantity that I do know about
        // Objects required:
        // - Total number of dice in play + number of modifier dice
        // -- Number of unknown rolls
        // -- Number of known rolls
        // -- Values of known rolls
        // - Most recent bet
        // - List of potential bets to choose from
        // -- Probability for each of these bets to be true

        // Find where in the possibleBets array to search from
        // Anything equaling or below the most recent bet value is disallowed and removed from the array
        const mostRecentBetIndex = getBetIndex(this.betProbabilities);
        this.betProbabilities.splice(0, mostRecentBetIndex + 1);

        // Select and return a random Bet with a probability matching maxProbability
        const maxProbability = Math.max(...this.betProbabilities.map(el => el.probability));
        let selection = [];
        this.betProbabilities.forEach(el => {
            if (el.probability === maxProbability) selection.push(el)
        });
        this.bet = selection[Math.floor(Math.random() * selection.length)];
        state.bets.push(this.bet);
        return this.bet;
    };

    response() {
        // Challenge the bet if the opponent's bet is less likely than half of the maximum amount of dice being the same value
        const mostRecentBetIndex = getBetIndex(this.betProbabilities);
        const probabilityOfBet = calculation.probabilityOfBet(this.betProbabilities[mostRecentBetIndex], this.rollData, this.handSize);
        console.log(this.rollData);
        console.log(probabilityOfBet);
        if (probabilityOfBet < .5) {
            return 'CHALLENGE';
        } else {
            return 'BET';
        }
    };
};

const countRolls = rolls => {
    const rollCounts = {};
    rolls.forEach(el => {
        rollCounts[el] = (rollCounts[el] || 0) + 1;
    });
    return rollCounts;
};

const betProbabilities = (id, rollData) => {
    return calculation.possibleBets(id, rollData);
};

const getBetIndex = arr => {
    const mostRecentBet = state.mostRecentBet();
    let index;
    arr.forEach((el, ind) => {
        if (el.value === mostRecentBet.value && el.quantity === mostRecentBet.quantity) {
            index = ind;
        };
    });
    return index;
};