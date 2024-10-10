// shopController handels all shop transactions
// shopController needs to access weaponsModel and consumablesModel

/* 
    Algorithm: Purchasing item:
    1) check if user has enough gold
    2) If they do, proceed with purchasing operation
        2.1) Create new inventory item which consists of refName (for locating item in array),
            type (for locating correct list) and category (for locating correct item within list if needed)
        2.2) Push new inventory item to player's inventory
        2.3) Set inventory item to null
    3) If they don't have enough gold, push a message telling them so             
*/

import { PRICE_APPLE,PRICE_S_LIFE_POTION,PRICE_S_MANA_POTION,PRICE_SHORT_SWORD,PRICE_HAND_AXE
    ,PRICE_KRIS,PRICE_MACE,NOT_ENOUGH_GOLD }from '../constants/shop.js';
import { CAT_WEAPON, CAT_HP_RECOVERY, EQUIPPABLE, CONSUMABLE } from '../constants/inventory.js';    
import { INVENTORY_CAPACITY } from '../constants/inventory.js';

import { weapons } from '../model/items/weaponsModel.js';
import { consumables } from '../model/items/consumablesModel.js';
import { player } from '../model/playerModel.js';

import { inventoryView } from '../view/inventoryView.js';
import { navigationView } from '../view/navigationView.js';

let newInventoryItem;
let isAffordable = false;
let isInventoryFull = false;
let inventory = player.inventory;
let equippedGear = player.equippedGear;

const shopController = {

    // Weapons
    buyShortSword: function() {

        // Get weapon ref name from weaponsModel, push it to player inventory
        attemptFetchAddPurchaseItem(weapons[1].name, PRICE_SHORT_SWORD, CAT_WEAPON, EQUIPPABLE);
    
        // Update view on whether or not short sword was purchased
        updateViewOnPurchaseAttempt();
    },

    buyHandAxe: function() {

        // Get weapon ref name from weaponsModel, push it to player inventory
        attemptFetchAddPurchaseItem(weapons[2].name, PRICE_HAND_AXE, CAT_WEAPON, EQUIPPABLE);

        // Update view on whether or not hand axe was purchased
        updateViewOnPurchaseAttempt();
    },

    buyKris: function() {

        // Get weapon ref name from weaponsModel, push it to player inventory
        attemptFetchAddPurchaseItem(weapons[3].name, PRICE_KRIS, CAT_WEAPON, EQUIPPABLE);

        // Update view on whether or not kris was purchased
        updateViewOnPurchaseAttempt();
    },

    buyMace: function() {

        // Get weapon ref name from weaponsModel, push it to player inventory
        attemptFetchAddPurchaseItem(weapons[4].name, PRICE_MACE, CAT_WEAPON, EQUIPPABLE);

        // Update view on whether or not mace is affordable
        updateViewOnPurchaseAttempt();
    },

    // Consumables
    buyApple: function() {

        // Get consumable ref name from consumablesModel, push it to player inventory
        attemptFetchAddPurchaseItem(consumables[0].name, PRICE_APPLE, CAT_HP_RECOVERY, CONSUMABLE);

        // Update view on whether or not apple is affordable
        updateViewOnPurchaseAttempt();
    },

    buySmallHealthPotion: function() {

        // Get consumable ref name from consumablesModel, push it to player inventory
        attemptFetchAddPurchaseItem(consumables[1].name, PRICE_S_LIFE_POTION, CAT_HP_RECOVERY, CONSUMABLE);

        // Update view on whether or not small health potion is affordable
        updateViewOnPurchaseAttempt();
    }
}

function attemptFetchAddPurchaseItem(itemToPurchase, itemPrice, itemCategory, itemType) {
    if (player.gold >= itemPrice) {
        if (inventory.length === INVENTORY_CAPACITY) {
            isInventoryFull = true;
        } else {
            player.gold -= itemPrice;
            newInventoryItem = {
                refName: itemToPurchase,
                category: itemCategory,
                type: itemType
            };
            inventory.push(newInventoryItem);
            newInventoryItem = null;
            isAffordable = true;
        }
    } else {
        isAffordable = false;
    }
}

function updateViewOnPurchaseAttempt() {
    if (isInventoryFull) {
        navigationView.updateText("Sorry pal... you don't have more room in your inventory");
        return;
    }
    if (isAffordable) {
        let newItem = player.inventory[player.inventory.length - 1].refName;
        navigationView.updateText(`You bought a brand new ${newItem}`);
        isAffordable = false;
        inventoryView.updateInventoryAndEquippedGearView(equippedGear, inventory);
    } else {
        navigationView.updateText(NOT_ENOUGH_GOLD);
    }
}

export { shopController };