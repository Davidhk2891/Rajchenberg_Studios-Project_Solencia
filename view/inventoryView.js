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
        /*
        <div id="player-inventory" class="side-panels">
            <div id="player-inventory-content-cont">
                <p id="player-inventory-title">Inventory</p>
                <div id="player-equipped-gear-cont"></div>
                <div id="player-inventory-cont"></div>
            </div>
        </div>
        */

        /*

        */

        // Algorithm:
        /* 
        1. Get the inventory array from the inventory parameter
        2. Iterate over it
        3. Generate a p element which contains n item in the inventory to which you get the name
        */
        playerEquippedGearCont.innerHTML = "";
        equippedGear.forEach(function(gearPiece) {
            const p = document.createElement('gear-item');

            /* 
            equippedGear : [
                {
                    refName: "Small Axe",
                    category: "weapon",
                    type: "equippable"
                }
            ],
            */

            if (gearPiece.category = "weapon") {
                p.innerText = `- Weapon: ${gearPiece.refName}`;
            }
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