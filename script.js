import { navigationController } from './controller/navigationController.js';
import { inventoryController } from './controller/inventoryController.js';
import { playerStateController } from './controller/playerStateController.js';

function runGame() {
    
    // Start the game in the fortress
    navigationController.goFortress();
    inventoryController.renderPlayerInventory();
    playerStateController.initPlayerStateAtGameStart();
}

document.addEventListener('DOMContentLoaded', function() {
    runGame();
});

