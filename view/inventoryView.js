import { inventoryCont, playerInvWindow, playerEquippedGearCont, playerInventoryCont,
    pWeapon, pArmor, gameUIContent, consumableSlot1Amount, consumableSlot2Amount,
     consumableSlot1Img, consumableSlot2Img } from '../constants/domElements.js';

// UI controls
let isInventoryShowing = false;
let blockManualInvOpening = false;

const inventoryView = {
    
    updateInventoryAndEquippedGearView: function(equippedGear, inventory) {

        let itemPrefix = "-";

        this.clearEquippedGearCont();

        // Weapon
        if (equippedGear.weapon.refName != null) {
            pWeapon.innerText += ` ${equippedGear.weapon.refName}`;
        }

        // Armor
        if (equippedGear.armor.refName != null) {
            pArmor.innerText += ` ${equippedGear.armor.refName}`;
        }

        // Inventory
        this.clearInventory();
        inventory.forEach(function(invPiece) {
            const pInv = document.createElement('inventory-item');
            pInv.style.cursor = "pointer";
            pInv.style.marginTop = "4px";
            pInv.innerText = `${itemPrefix} ${invPiece.refName}`;
            playerInventoryCont.appendChild(pInv);
        });
    },

    updateConsumableSlots: function(consumableSlots) {
        consumableSlot1Amount.innerText = consumableSlots.slotOne.amount;
        consumableSlot2Amount.innerText = consumableSlots.slotTwo.amount;
    },

    updateConsumableImages: function(slot, assetPath) {
        switch(slot) {
            case 1:
                consumableSlot1Img.src = assetPath;
                break;
            case 2:
                consumableSlot2Img.src = assetPath;
                break;
        }
    },

    updateGameContent: function(uiText) {
        gameUIContent.innerText = uiText;
    },

    clearInventory: function() {
        playerInventoryCont.innerHTML = "";
    },

    clearWeaponCont: function() {
        pWeapon.innerText = WEAPON_CONT;
    },

    clearEquippedGearCont: function() {
        pWeapon.innerText = WEAPON_CONT;
        pArmor.innerText = ARMOR_CONT;
    },

    handleDrawerOpening: function(showInventory) {
        runInventoryOpeningBehavior(showInventory);
    }
}

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