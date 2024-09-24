import { charStatsCont, playerDataWindow, inventoryCont, playerInvWindow } from './constants/domElements.js';
import { goFortress } from './model/locationsModel.js';
import { navigationController } from './controller/navigationController.js';
// UI controls

let isPlayerDataWindowShowing = false;
let isPlayerInvWindowShowing = false;

charStatsCont.addEventListener('click', function(){
    if (!isPlayerDataWindowShowing) {
        playerDataWindow.style.display = "inline";
        isPlayerDataWindowShowing = true;
    } else {
        playerDataWindow.style.display = "none";
        isPlayerDataWindowShowing = false;
    }

});

inventoryCont.addEventListener('click', function(){
    if (!isPlayerInvWindowShowing) {
        playerInvWindow.style.display = "inline";
        isPlayerInvWindowShowing = true;
    } else {
        playerInvWindow.style.display = "none";
        isPlayerInvWindowShowing = false;
    }
});

// Run game
function runGame() {
    navigationController.goFortress(); // Start the game in the fortress
}

runGame();

