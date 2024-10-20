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

const inventoryController = {

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

export { inventoryController };