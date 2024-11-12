/* 
    playerState will handle player's state. 
    1) hp recovery
*/

import { player } from "../model/playerModel.js";

import { playerView } from "../view/playerView.js";

const playerStateController = {

    // lvl, xp, life, mana
    // Fetch values from player constants.  Call function in script
    initPlayerStateAtGameStart: function() {

        // Do operations to pass correct % to HP
        let UIReadyLife = player.life.toString() + "%";

        // Do operations to pass correct % to MP
        let UIReadyMana = player.mana.toString() + "%";

        playerView.initializeUIFromPlayerState(player.level, player.xp, UIReadyLife, UIReadyMana);
    },
    
    healPlayer: function(amountToHeal) {

        // Add amount to current player's life
        player.life += amountToHeal;

        // Ensure that healing does not go over player's max life
        if (player.life > player.maxLife) {
            player.life = player.maxLife;
        }

        // Update player's life UI bar
        let UIReadyLife = player.life.toString() + "%";
        let updatedGameContent = "You healed " + amountToHeal + " HP.";
        playerView.updateLifeBar(UIReadyLife, updatedGameContent);
    },

    killPlayer: function() {

        // Get "Die" state
        let dieState = player.states[2];

        // Get the correct button functions and return them.
        const buttonFunctions = dieState["button functions"].map((funcObj) => {

            if (typeof this[funcObj] === 'function') {
                return this[funcObj].bind(this);
            }
        });

        // Render player state text
        playerView.updatePlayerStateText(dieState.text);

        // Render action buttons and pass the functions
        playerView.updatePlayerStateButtons(dieState["button text"], buttonFunctions);
    },

    revivePlayer: function() {
        console.log("Reviving player");
        // Works. carry on later.
    }
}

export { playerStateController };