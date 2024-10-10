import { inventoryCont, playerInvWindow, playerEquippedGearCont, playerInventoryCont,
     pWeapon, pArmor, gameUIContent } from '../constants/domElements.js';
import { CAT_WEAPON, CAT_HP_RECOVERY, EQUIPPABLE, CONSUMABLE } from '../constants/inventory.js';

// UI controls
let isInventoryShowing = false;
let blockManualInvOpening = false;
let currWeaponPrefix = "- Weapon:";
let currArmorPrefix = "- Armor:";
let itemPrefix = "-";

const inventoryView = {
    
    updateInventoryAndEquippedGearView: function(equippedGear, inventory) {

        playerEquippedGearCont.innerHTML = "";

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
        playerInventoryCont.innerHTML = "";
        inventory.forEach(function(invPiece, i, inv) {
            renderList(invPiece, i, inv, equippedGear, pWeapon, pArmor);
        });
    },

    handleDrawerOpening: function(showInventory) {
        runInventoryOpeningBehavior(showInventory);
    }
}

function renderList(invPiece, invIndex, inventory, equippedGear, pWeapon, pArmor) {
    // There is recursion in here
    const pInv = document.createElement('inventory-item');
    pInv.style.cursor = "pointer";
    pInv.innerText = `${itemPrefix} ${invPiece.refName}`;
    playerInventoryCont.appendChild(pInv);
    pInv.style.marginTop = "4px";

    pInv.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        console.log(`Index from item pressed: ${invIndex}`);
        addSelectedGearToEG(inventory, invIndex, equippedGear, pWeapon, pArmor);
    });
}

function addSelectedGearToEG(inventory, invIndex, equippedGear, pWeapon, pArmor) {

    // 1. Above all, check if the item is equippable
    if (inventory[invIndex].type = EQUIPPABLE) {

        // 1.1 If equippedGear.weapon has weapon, store in temp var
        let tempWeaponRefName, tempWeaponCategory, tempWeaponType;
        if (equippedGear.weapon.refName != null) {

            tempWeaponRefName = equippedGear.weapon.refName;
            tempWeaponCategory = equippedGear.weapon.category;
            tempWeaponType = equippedGear.weapon.type;
        }

        // 1.2 Replace current equippedGear.weapon with inventory[invIndex] and update UI
        console.log(`Inventory index in inventory array is ${invIndex}`);
        console.log(`SWAPPING ${equippedGear.weapon.refName} WITH ${inventory[invIndex].refName}`);
        if (inventory[invIndex].category == "weapon") {
            equippedGear.weapon.refName = inventory[invIndex].refName;
            equippedGear.weapon.category = inventory[invIndex].category;
            equippedGear.weapon.type = inventory[invIndex].type;
        } else if (inventory[invIndex].category == "armor") {
            equippedGear.armor.refName = inventory[invIndex].refName;
            equippedGear.armor.category = inventory[invIndex].category;
            equippedGear.armor.type = inventory[invIndex].type;
        }
        gameUIContent.innerText = `You just equipped your ${inventory[invIndex].refName}`;

        // 1.3 remove inventory[invIndex]
        inventory.splice(invIndex, 1);

        // 1.4 Store (push) temp var into inventory
        let newInvItem = {
            refName: tempWeaponRefName,
            category: tempWeaponCategory,
            type: tempWeaponType
        }
        inventory.push(newInvItem);

        // 1.5 Update UI elements in inventory
        pWeapon.innerText = `${currWeaponPrefix} ${equippedGear.weapon.refName}`;
        pArmor.innerText = `${currArmorPrefix} ${equippedGear.armor.refName}`;

        playerInventoryCont.innerHTML = "";
        inventory.forEach(function(invPiece, index) {
            renderList(invPiece, index, inventory, equippedGear, pWeapon, pArmor);
        });
    } else if (inventory[invIndex].type = CONSUMABLE) {

        /* Here will run the operations for consuming a consumable. Such as left clicking and
           consuming it right away, right clicking and additing to cons slots, and running all
           of the needed operations. 
        */
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