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
        player.placeBet();
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
        let input;
        if (!player.cpu) {
            input = prompt(`
            Your hand is ${player.hand}.\n
            Type BET to place a bet.\n
            Type CHALLENGE to issue a challenge.\n
            Type EXIT to exit the app.
        `);
        } else {
            input = player.response();
        };
        if (input === 'BET') {
            const bet = placeBet(player);
            console.log(`Quantity: ${bet.quantity}; Value: ${bet.value}`);
        } else if (input === 'CHALLENGE') {
            alert(`${player.name} is issuing a challenge!`);
            state.roundResult = challenge(player);
            state.roundConditionMet = true;
        } else {
            state.roundConditionMet = true;
            state.gameConditionMet = true;
        };
        console.log(input);
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