import Player from './Player';
import CPU from './CPU';

export default class State {
    constructor() {
        this.players = [];
        this.bets = [];
        this.roundConditionMet = false;
        this.gameConditionMet = false;
        this.roundResult = {};
    };

    start() {
        this.players.push(new Player(1, 'Player 1'));
        this.players.push(new CPU(2, 'Player 2'));
    };

    reset() {
        this.players = [];
        this.bets = [];
        this.roundConditionMet = false;
        this.gameConditionMet = false;
        this.roundResult = undefined;
    }

    newRound() {
        this.bets = [];
        this.roundConditionMet = false;
        this.roundResult = undefined;
        this.rollDice();
    }

    rollDice() {
        this.players.forEach(el => el.rollDice());
    };

    mostRecentBet() {
        return this.bets.slice(-1)[0];
    };

    diceInPlay() {
        let count = 0;
        this.players.forEach(el => count += el.handSize);
        return count;
    };
};