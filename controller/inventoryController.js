import { player } from "../model/playerModel.js";
import { inventoryView } from "../view/inventoryView.js";

const inventoryController = {

    renderPlayerInventory: function() {

        // Get the player equippable gear array from the player object in playerModel
        let equippedGearObj = player.equippedGear;
        // Get the player inventory array from the player object in playerModel
        let inventoryArr = player.inventory;

        // Show player equipped gear and inventory in the inventory window
        inventoryView.updateInventoryAndEquippedGearView(equippedGearObj, inventoryArr);
    }
}

export { inventoryController };