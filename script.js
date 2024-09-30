import { navigationController } from './controller/navigationController.js';

function runGame() {
    
    // Start the game in the fortress
    navigationController.goFortress();
}

document.addEventListener('DOMContentLoaded', function() {
    runGame();
});

