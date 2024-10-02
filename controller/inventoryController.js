import { player } from "../model/playerModel";
import { inventoryView } from "../view/inventoryView";


const inventoryController = {

    showPlayerInventory: function() {

        // Get the player inventory array from the player object in playerModel
        let inventoryArr = player.inventory;

        // Show player inventory in the inventory window
        inventoryView.updateInventoryView(inventoryArr);
    }
}