import { player } from "../model/playerModel.js";
import { consumables } from "../model/items/consumablesModel.js";

import { playerStateController } from "./playerStateController.js";

import { inventoryView } from "../view/inventoryView.js";

const inventoryController = {

    consumableListenerAdded: false,

    renderPlayerInventory: function() {

        // Get gear, inventory and consumable slots from respective models
        let equippedGear = player.equippedGear;
        let inventory = player.inventory;
        let consumableSlots = player.consumableSlots;

        // Call the view to render inventory, gear and consumable slots
        inventoryView.updateInventoryAndEquippedGearView(equippedGear, inventory);
        inventoryView.updateConsumableSlots(consumableSlots);

        // Add user interaction logic for items in inventory, equipped gear and consumable slots
        this.addInventoryInteraction(inventory, equippedGear, consumableSlots);
        this.addConsumableSlotsInteraction(consumableSlots);
    },

    addConsumableSlotsInteraction: function(consumableSlots) {

        let self = this;

        if (self.consumableListenerAdded) return;
        self.consumableListenerAdded = true;

        /* 
            New bug: Every consuming event reduces the amount remaining by 2 instead of 1    
        */

        document.addEventListener('keyup', function(event) {
            switch (event.key) {
                case 'q':
                    if (consumableSlots.slotOne.amount > 0) {

                        switch (consumableSlots.slotOne.refName) {
                            case "Apple":
                                playerStateController.healPlayer(consumables[0].effect);
                                break;
                            case "Small health potion":
                                playerStateController.healPlayer(consumables[1].effect);
                                break;
                            case "Small mana potion":
                                console.log('Small mana potion to be used up here');
                                break;
                        }

                        if (consumableSlots.slotOne.amount >= 2) {
                            consumableSlots.slotOne.amount--;
                            inventoryView.updateConsumableSlots(consumableSlots);
                        } else {
                            consumableSlots.slotOne.refName = null;
                            consumableSlots.slotOne.amount = 0;
                            inventoryView.updateConsumableSlots(consumableSlots);
                            inventoryView.updateConsumableImages(1, self.getConsumableImagePath("Empty"));
                        }
                    }
                    break;

                case 'w':
                    if (consumableSlots.slotTwo.amount > 0) {

                        switch (consumableSlots.slotTwo.refName) {
                            case "Apple":
                                playerStateController.healPlayer(consumables[0].effect);
                                break;
                            case "Small health potion":
                                playerStateController.healPlayer(consumables[1].effect);
                                break;
                            case "Small mana potion":
                                console.log('Small mana potion to be used up here');
                                break;
                        }

                        if (consumableSlots.slotTwo.amount >= 2) {
                            consumableSlots.slotTwo.amount--;
                            inventoryView.updateConsumableSlots(consumableSlots);
                        } else {
                            consumableSlots.slotTwo.refName = null;
                            consumableSlots.slotTwo.amount = 0;
                            inventoryView.updateConsumableSlots(consumableSlots);
                            inventoryView.updateConsumableImages(2, self.getConsumableImagePath("Empty"));
                        }
                    }
                    break;
            }
        });
    },

    addInventoryInteraction: function(inventory, equippedGear, consumableSlots) {

        // Get the inventoryController object for context
        const self = this;

        // Loop through inventory items and set up event listeners for user input
        inventory.forEach(function(invItem, index) {

            const pInv = document.querySelectorAll('inventory-item')[index];

            pInv.addEventListener('contextmenu', function(event) {
                event.preventDefault();
                self.handleInventoryItemUse(invItem, index, equippedGear, consumableSlots, event.type);
            });

            pInv.addEventListener('click', function(event) {
                self.handleInventoryItemUse(invItem, index, equippedGear, consumableSlots, event.type);
            });
        });
    },

    handleInventoryItemUse: function(invItem, index, equippedGear, consumableSlots, eventType) {

        // Logic to handle equipping items and consumables and using consumables from inv
        switch (invItem.type) {

            case EQUIPPABLE:
                this.equipEquippable(invItem, index, equippedGear);
                break;

            case CONSUMABLE:
                if (eventType == 'contextmenu')
                    this.equipConsumable(invItem, index, consumableSlots);
                else if (eventType == 'click')
                    this.useConsumable(invItem, index);
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

        // Remove item from inventory
        player.inventory.splice(index, 1);

        // If temporary equipped gear holder isn't null, add that back to inventory
        if (tempEquippedGearHolder != null)
            player.inventory.push(tempEquippedGearHolder);

        // Update UI on equippable latest action
        let updatedGearToUI = `You just equipped your ${invItem.refName}`;
        this.updateUIonInventoryItemEngaged(updatedGearToUI);

        // re-render
        inventoryView.clearInventory();
        this.renderPlayerInventory();
    },

    equipConsumable: function(invItem, index, consumableSlots) {

        let slotOneAmount = null;
        let slotTwoAmount = null;
        let updatedConsumableUseToUI = null;
        let isConsumableEquipped = false;

        // Add consumable to available slot and update UI
        if (consumableSlots.slotOne.amount < 10 && (consumableSlots.slotOne.refName == null ||
            invItem.refName == consumableSlots.slotOne.refName)) {
                
                // Get the current amount
                slotOneAmount = consumableSlots.slotOne.amount;

                // Slot one has vacancy
                consumableSlots.slotOne.refName = invItem.refName;

                // Increase slot one amount
                slotOneAmount++;
                consumableSlots.slotOne.amount = slotOneAmount;

                // Update the view for the consumable slot (amount and image)
                inventoryView.updateConsumableSlots(consumableSlots);
                inventoryView.updateConsumableImages(1, this.getConsumableImagePath(invItem.refName));

                // Update UI on consumable latest action
                updatedConsumableUseToUI = `You equipped a fresh ${invItem.refName}`;
                this.updateUIonInventoryItemEngaged(updatedConsumableUseToUI);

                isConsumableEquipped = true;

        } else if (consumableSlots.slotTwo.amount < 10 && (consumableSlots.slotTwo.refName == null ||
            invItem.refName == consumableSlots.slotTwo.refName)) {

                // Get the current amount
                slotTwoAmount = consumableSlots.slotTwo.amount;

                // Slot two has vacancy
                consumableSlots.slotTwo.refName = invItem.refName;

                // Increase slot two amount
                slotTwoAmount++;
                consumableSlots.slotTwo.amount = slotTwoAmount;

                // Update the view for the consumable slot (amount and image)
                inventoryView.updateConsumableSlots(consumableSlots);
                inventoryView.updateConsumableImages(2, this.getConsumableImagePath(invItem.refName));

                // Update UI on consumable latest action
                updatedConsumableUseToUI = `You equipped a fresh ${invItem.refName}`;
                this.updateUIonInventoryItemEngaged(updatedConsumableUseToUI);

                isConsumableEquipped = true;

        } else {

            if (consumableSlots.slotTwo.amount == 10) {
                updatedConsumableUseToUI = "Bro there ain't no more room! what are you doing?";
                this.updateUIonInventoryItemEngaged(updatedConsumableUseToUI);
            }

            isConsumableEquipped = false;
        }

        // Remove consumable item from inventory and re-render if this one was equipped
        if (isConsumableEquipped) {
            this.disposeInventoryConsumable(index);
        }
    },

    useConsumable: function(invItem, index) {
        // Algo
        /* 
            1) Call playerStateController's healPlayer, pass the amount argument based on the item refName - DONE
            2) Update UI indicating how much was healed - DONE
            3) Remove selected item from inventory
            NOTE: You can consume health and mana recovery consumables even if the player is maxed out
        */
        switch(invItem.refName) {
            case "Apple":
                playerStateController.healPlayer(consumables[0].effect);
                break;
            case "Small health potion":
                playerStateController.healPlayer(consumables[1].effect);
                break;
            case "Small mana potion":
                console.log('Small mana potion to be used up here');
                break;
        }

        // Remove consumable item from inventory and re-render if this one was equipped
        this.disposeInventoryConsumable(index);
    },

    updateUIonInventoryItemEngaged: function(uiText) {

        // Call the view to display current game content text from controller
        inventoryView.updateGameContent(uiText);
    },

    getConsumableImagePath: function(consumableName) {

        // Return the correct image path based on the consumable name
        switch (consumableName) {
            case "Apple":
                return "./assets/images/consumable_apple.png";
            case "Small health potion":
                return "./assets/images/consumable_s_health_pot.png";
            case "Small mana potion":
                return "./assets/images/consumable_s_mana_pot.png";
            case "Empty":
                return "./assets/images/consumable_slot_empty.gif";
            default:
                return "";
        }
    },

    disposeInventoryConsumable: function(index) {
        player.inventory.splice(index, 1);
        inventoryView.clearInventory();
        this.renderPlayerInventory();
    }
}

export { inventoryController };