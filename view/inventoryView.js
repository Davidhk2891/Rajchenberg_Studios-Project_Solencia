import { inventoryCont, playerInvWindow, playerEquippedGearCont, playerInventoryCont,
    pWeapon, pArmor, gameUIContent, consumableSlot1Amount, consumableSlot2Amount,
     consumableSlot1Img, consumableSlot2Img } from '../constants/domElements.js';

// UI controls
let isInventoryShowing = false;
let blockManualInvOpening = false;
let currWeaponPrefix = "- Weapon:";
let currArmorPrefix = "- Armor:";
let itemPrefix = "-";

const inventoryView = {
    
    updateInventoryAndEquippedGearView: function(equippedGear, inventory) {

        this.clearEquippedGearCont();

        // Weapon
        if (equippedGear.weapon.refName != null) {
            pWeapon.innerText = `${currWeaponPrefix} ${equippedGear.weapon.refName}`;
            playerEquippedGearCont.appendChild(pWeapon);
            pWeapon.style.marginTop = "4px";
        }

        // Armor
        if (equippedGear.armor.refName != null) {
            pArmor.innerText = `${currArmorPrefix} ${equippedGear.armor.refName}`;
            playerEquippedGearCont.appendChild(pArmor);
            pArmor.style.marginTop = "4px";
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

    clearEquippedGearCont: function() {
        playerEquippedGearCont.innerHTML = "";
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