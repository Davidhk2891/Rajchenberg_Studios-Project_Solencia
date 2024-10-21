/* 
    Controllers handle:
        1) Game logic
        2) User input
        3) Interaction with the model
        4) And then passes data to the view to update the UI
*/

import { player } from "../model/playerModel.js";
import { inventoryView } from "../view/inventoryView.js";
import { consumables } from "../model/items/consumablesModel.js";

const inventoryController_legacy = {

    renderPlayerInventory: function() {

        // Get the player equippable gear array from the player object in playerModel
        let equippedGearObj = player.equippedGear;
        // Get the player inventory array from the player object in playerModel
        let inventoryArr = player.inventory;
        // Get the player consumable slots array from the player object in playerModel
        let consumableSlotsArr = player.consumableSlots;
        // Get the list of consumables for consumable operations
        let allConsumablesArr = consumables;

        // Show player equipped gear and inventory in the inventory window
        inventoryView.updateInventoryAndEquippedGearView(equippedGearObj, inventoryArr,
             consumableSlotsArr, allConsumablesArr);
    }
}

const inventoryController = {

    renderPlayerInventory: function(uiText) {

        // Get gear, inventory and consumable slots from respective models
        let equippedGear = player.equippedGear;
        let inventory = player.inventory;
        let consumableSlots = player.consumableSlots;

        // Call the view to render inventory, gear and consumable slots
        inventoryView.updateInventoryAndEquippedGearView(equippedGear, inventory);
        inventoryView.updateConsumableSlots(consumableSlots);

        // Call the view to display current game content text from controller
        inventoryView.updateGameContent(uiText);

        // Add user interaction logic for items and inventory
        this.addInventoryInteraction(inventory, equippedGear, consumableSlots);
        
    },

    addInventoryInteraction: function(inventory, equippedGear, consumableSlots) {

        // Loop through inventory items and set up event listeners for user input
        inventory.forEach(function(invItem, index) {

            const pInv = document.querySelectorAll('inventory-item')[index];
            pInv.style.cursor = "pointer";

            pInv.addEventListener('contextmenu', function(event) {
                event.preventDefault();
                this.handleItemUse(invItem, index, equippedGear, consumableSlots);
            });
        });
    },

    handleItemUse: function(invItem, index, equippedGear, consumableSlots) {

        // Logic to handle equipping items and consumables and using consumables from inv
        switch (invItem.type) {

            case EQUIPPABLE:
                this.equipEquippable(invItem, index, equippedGear);
                break;

            case CONSUMABLE:
                this.equipConsumable(invItem, index, consumableSlots);
                break;
        };
    },

    equipEquippable: function(invItem, index, equippedGear) {

        // If equippedGear has something equipped, save invItem in temporary var
        // Replace current equipped item with selected inventory item.
        // Since equippedGear and inventory have the same schema, you can assign the whole object
        let tempEquippedGearHolder = null;
        if (invItem.category == "weapon") {
            if (equippedGear.weapon.refName != null)
                tempEquippedGearHolder = equippedGear.weapon;
            equippedGear.weapon = invItem;
        } else if (invItem.category == "armor") {
            if (equippedGear.armor.refName != null)
                tempEquippedGearHolder = equippedGear.armor;
            equippedGear.armor = invItem;
        }
        let updatedGearToUI = `You just equipped your ${equippedGear.weapon.refName}`;

        // Remove item from inventory
        player.inventory.splice(index, 1);

        // If temporary equipped gear holder isn't null, add that back to inventory
        if (tempEquippedGearHolder != null)
            inventory.push(tempEquippedGearHolder);

        // re-render
        this.renderPlayerInventory(updatedGearToUI);
    },

    equipConsumable: function(invItem, index, consumableSlots) {

        // Add consumable to available slot and update UI
        if (consumableSlots.slotOne.amount < 10) {
            
        }
    }
}

export { inventoryController_legacy };