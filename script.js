import { navigationController } from './controller/navigationController.js';
import { inventoryController } from './controller/inventoryController.js';

function runGame() {
    
    // Start the game in the fortress
    navigationController.goFortress();
    inventoryController.renderPlayerInventory();
}

document.addEventListener('DOMContentLoaded', function() {
    runGame();
});

