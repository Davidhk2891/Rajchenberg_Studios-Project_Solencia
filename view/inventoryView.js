import { inventoryCont, playerInvWindow, playerEquippedGearCont, playerInventoryCont,
    pWeapon, pArmor, gameUIContent, consumableSlot1, consumableSlot2,
    consumableSlot1Amount, consumableSlot2Amount} from '../constants/domElements.js';

// UI controls
let isInventoryShowing = false;
let blockManualInvOpening = false;
let currWeaponPrefix = "- Weapon:";
let currArmorPrefix = "- Armor:";
let itemPrefix = "-";
let slotOneAmount;
let slotTwoAmount;

const inventoryView = {
    
    updateInventoryAndEquippedGearView: function(equippedGear, inventory, consumableSlots, consumablesList) {

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
            renderList(invPiece, i, inv, equippedGear, pWeapon, pArmor, consumableSlots, consumablesList);
        });
    },

    handleDrawerOpening: function(showInventory) {
        runInventoryOpeningBehavior(showInventory);
    }
}

function renderList(invPiece, invIndex, inventory, equippedGear, pWeapon, pArmor, consumableSlots, consumablesList) {
    // There is recursion in here
    const pInv = document.createElement('inventory-item');
    pInv.style.cursor = "pointer";
    pInv.innerText = `${itemPrefix} ${invPiece.refName}`;
    playerInventoryCont.appendChild(pInv);
    pInv.style.marginTop = "4px";

    pInv.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        addSelectedItemToContainer(inventory, invIndex, equippedGear, pWeapon
            , pArmor, consumableSlots, consumablesList);
    });

    pInv.addEventListener('click', function() {
        console.log(`Index from item pressed: ${inventory[invIndex].refName}`);
    });
}

function addSelectedItemToContainer(inventory, invIndex, equippedGear, pWeapon
    , pArmor, consumableSlots, consumablesList) {

    // Above all, check if the item is equippable
    console.log(`the current selected item: 
    \nName: ${inventory[invIndex].refName}
    \nCategory: ${inventory[invIndex].category}
    \nType: ${inventory[invIndex].type}`);

    switch (inventory[invIndex].type) {
        case EQUIPPABLE:
            // If equippedGear.weapon has weapon, store in temp var
            let tempWeaponRefName, tempWeaponCategory, tempWeaponType;
            if (equippedGear.weapon.refName != null) {

                tempWeaponRefName = equippedGear.weapon.refName;
                tempWeaponCategory = equippedGear.weapon.category;
                tempWeaponType = equippedGear.weapon.type;
            }

            // Replace current equippedGear.weapon with inventory[invIndex] and update UI
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

            // remove inventory[invIndex]
            inventory.splice(invIndex, 1);

            // Store (push) temp var into inventory
            let newInvItem = {
                refName: tempWeaponRefName,
                category: tempWeaponCategory,
                type: tempWeaponType
            }
            inventory.push(newInvItem);

            // Update UI elements in inventory
            pWeapon.innerText = `${currWeaponPrefix} ${equippedGear.weapon.refName}`;
            pArmor.innerText = `${currArmorPrefix} ${equippedGear.armor.refName}`;

            playerInventoryCont.innerHTML = "";
            inventory.forEach(function(invPiece, index) {
                renderList(invPiece, index, inventory, equippedGear, pWeapon, pArmor);
            });
            break;
        
        case CONSUMABLE:
            
            // Compare the inventory[invIndex].type against the consumables list and locate match
            consumablesList.forEach(function(consumable) {

                // Since all we want is to add it to the slots, avoid all the consuming logic here
                // You want to add the right-clicked consumable into the correct consumableSlots object
                if (inventory[invIndex].refName === consumable.name) {
                    if (consumableSlots.slotOne.amount < 10) {

                        // Get the current amount
                        slotOneAmount = consumableSlots.slotOne.amount;
                        
                        // Slot one has vacancy
                        consumableSlots.slotOne.refName = consumable.name;
                        consumableSlots.slotOne.category = consumable.category;
                        consumableSlots.slotOne.effect = consumable.effect;

                        // Increase slotOne amount
                        slotOneAmount++;
                        consumableSlots.slotOne.amount = slotOneAmount;

                        // Add slotOne amount to slot 1 UI
                        consumableSlot1Amount.innerText = consumableSlots.slotOne.amount;
                        console.log("Slot one amount: " + consumableSlots.slotOne.amount);
                        
                        // Add respective consumable asset into slot with the proper dimensions
                        

                    } else if(consumableSlots.slotTwo.amount < 10) {

                        // Consumable slot 1 full. Start filling up the second one

                        // Get the current amount
                        slotTwoAmount = consumableSlots.slotTwo.amount;

                        // Slot one has vacancy
                        consumableSlots.slotTwo.refName = consumable.name;
                        consumableSlots.slotTwo.category = consumable.category;
                        consumableSlots.slotTwo.effect = consumable.effect;

                        // Increase slotTwo amount
                        slotTwoAmount++;
                        consumableSlots.slotTwo.amount = slotTwoAmount;

                        // Add slotTwo amount to slot 2 UI
                        consumableSlot2Amount.innerText = consumableSlots.slotTwo.amount;
                        console.log("Slot two amount: " + consumableSlots.slotTwo.amount);

                        // Add respective consumable asset into slot with the proper dimensions

                    }
                }
            }); 
            // Remove inventory[invIndex] from inventory and re-render list
            inventory.splice(invIndex, 1);
            playerInventoryCont.innerHTML = "";
            inventory.forEach(function(invPiece, index) {
                renderList(invPiece, index, inventory, equippedGear, pWeapon, pArmor);
            });
            break;
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