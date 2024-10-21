import { navigationController } from './controller/navigationController.js';
import { inventoryController_legacy } from './controller/inventoryController.js';

function runGame() {
    
    // Start the game in the fortress
    navigationController.goFortress();
    inventoryController_legacy.renderPlayerInventory();
}

document.addEventListener('DOMContentLoaded', function() {
    runGame();
});

