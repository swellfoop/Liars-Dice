import Player from './Player';

export default class State {
    constructor() {
        this.players = [];
        this.bets = [];
        this.roundConditionMet = false;
        this.gameConditionMet = false;
        this.roundResult = {};
    };

    start() {
        this.players.push(new Player(1, 'Player 1', false));
        this.players.push(new Player(2, 'Player 2', true));
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
};