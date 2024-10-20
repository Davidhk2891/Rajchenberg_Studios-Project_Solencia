/* 
    playerState will handle well, the player's state. 
    1) hp recovery
*/

import { player } from "../model/playerModel.js";

const playerStateController = {

    
    healPlayer: function(amount) {

        // Add amount to current player's life
        player.life += amount;

        // Ensure that healing does not go over player's max life
        if (playerLife > player.maxLife) {
            player.life = player.maxLife;
        }

        // Update player's life UI bar
        playerView.updateLifeBar(player.life);
    }
}

export { playerStateController };