import { inventoryCont, playerInvWindow } from '../constants/domElements.js';

// UI controls
let isPlayerInvWindowShowing = false;

const inventoryView = {
    
    handleDrawerOpening: function() {
        inventoryCont.addEventListener('click', function(){
            if (!isPlayerInvWindowShowing) {
                playerInvWindow.style.display = "inline";
                isPlayerInvWindowShowing = true;
            } else {
                playerInvWindow.style.display = "none";
                isPlayerInvWindowShowing = false;
            }
        });
    }
}

export { inventoryView };

/* 
let isPlayerDataWindowShowing = false;
charStatsCont.addEventListener('click', function(){
    if (!isPlayerDataWindowShowing) {
        playerDataWindow.style.display = "inline";
        isPlayerDataWindowShowing = true;
    } else {
        playerDataWindow.style.display = "none";
        isPlayerDataWindowShowing = false;
    }

});
*/