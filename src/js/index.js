import State from './Models/State';
export const state = new State;
window.state = state;

const init = () => {
    state.reset();
    state.start();
};

const newGame = () => {
    init();
    gameControl();
}

const gameControl = () => {
    const placeBet = player => {
        let quantity;
        let value;
        player.bet = undefined;
        while (!player.bet) {
            quantity = prompt(`
                Your hand is ${player.hand}.\n
                Write your QUANTITY.
            `);
            value = prompt(`
                Your hand is ${player.hand}.\n
                Write your VALUE.`
            );
            player.placeBet(quantity, value);
        };
        return player.bet;
    };

    const challenge = player => {
        let defender;
        const result = {};
        if (state.players.length > 2) {
            // Prompt for player to challenge
        } else {
            state.players.forEach(el => {
                if (el.id !== player.id) defender = el;
            });
        };
        const valid = defender.bet.isValid();
        result.winner = valid ? defender : player;
        result.loser = valid ? player : defender;

        return result;
    };

    const round = player => {
        state.roundConditionMet = false;
        const input = prompt(`
            Your hand is ${player.hand}.\n
            Type BET to place a bet.\n
            Type CHALLENGE to issue a challenge.\n
            Type EXIT to exit the app.
        `);
        if (input === 'BET') {
            placeBet(player);
        } else if (input === 'CHALLENGE') {
            state.roundResult = challenge(player);
            state.roundConditionMet = true;
        } else {
            state.roundConditionMet = true;
            state.gameConditionMet = true;
        };
        return input;
    };
    
    while (state.gameConditionMet === false) {
        state.newRound();
        while (state.roundConditionMet === false) {
            for (let i = 0; i < state.players.length; i++) {
                round(state.players[i]);
                if (state.roundConditionMet === true) {
                    const loseGame = state.roundResult.loser.loseRound();
                    if (loseGame === true) state.gameConditionMet = true;
                    break;
                };
            };
            
        };
        console.log(state);
        console.log(`${state.roundResult.winner.name} has won the round!\n
            ${state.players.map(el => [el.name, el.handSize])}`);
        // state.gameConditionMet = true;
    };
    console.log(state);
    console.log(`${state.roundResult.winner.name} has won the game!`);
};

/*
window.addEventListener('load', () => {
    newGame();
});
*/

document.querySelector('.button--new-game').addEventListener('click', newGame);