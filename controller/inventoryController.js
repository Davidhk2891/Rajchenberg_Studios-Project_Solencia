import { player } from "../model/playerModel.js";
import { inventoryView } from "../view/inventoryView.js";

const inventoryController = {

    renderPlayerInventory: function() {

        // Get the player equippable gear array from the player object in playerModel
        let equippedGearArr = player.equippedGear;
        // Get the player inventory array from the player object in playerModel
        let inventoryArr = player.inventory;

        // Show player equipped gear in the inventory window
        inventoryView.updateEquippedGearView(equippedGearArr);
        // Show player inventory in the inventory window
        inventoryView.updateInventoryView(inventoryArr);
    }
}

export { inventoryController };