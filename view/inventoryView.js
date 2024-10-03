import { inventoryCont, playerInvWindow, playerEquippedGearCont, playerInventoryCont } from '../constants/domElements.js';

// UI controls
let isInventoryShowing = false;
let blockManualInvOpening = false;

function runInventoryOpeningBehaviorForListener() {
    if (!isInventoryShowing) {
        playerInvWindow.style.display = "inline";
        isInventoryShowing = true;
    } else {
        playerInvWindow.style.display = "none";
        isInventoryShowing = false;
    }
}

function runInventoryOpeningBehavior(showInventory) {
    if (showInventory) {
        playerInvWindow.style.display = "inline";
        showInventory = false;
        blockManualInvOpening = true;
    } else {
        playerInvWindow.style.display = "none";
        showInventory = true;
        blockManualInvOpening = false;
    }
}

const inventoryView = {
    
    updateEquippedGearView: function(equippedGear) {

        playerEquippedGearCont.innerHTML = "";
        equippedGear.forEach(function(gearPiece) {
            const p = document.createElement('gear-item');
            if (gearPiece.category = "weapon") {
                p.innerText = `- Weapon: ${gearPiece.refName}`;
            } else if (gearPiece.category = "armor") {
                p.innerText = `- Armor: ${gearPiece.refName}`;
            }
            playerEquippedGearCont.appendChild(p);
        });
    },

    updateInventoryView: function(inventory) {

        playerInventoryCont.innerHTML = "";
        inventory.forEach(function(invPiece) {
            const p = document.createElement('inventory-item');
            p.innerText = `- ${invPiece.refName}`;
            playerInventoryCont.appendChild(p);
        });
    },

    handleDrawerOpening: function(showInventory) {
        runInventoryOpeningBehavior(showInventory);
    }
}

inventoryCont.addEventListener('click', function(){
    if (!blockManualInvOpening)
        runInventoryOpeningBehaviorForListener();
});

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