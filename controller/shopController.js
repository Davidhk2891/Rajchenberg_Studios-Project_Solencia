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

import { PRICE_APPLE,PRICE_LIFE_POTION,PRICE_MANA_POTION,PRICE_SHORT_SWORD,PRICE_HAND_AXE
    ,PRICE_KRIS,PRICE_MACE,NOT_ENOUGH_GOLD,CAT_WEAPON,CAT_HP_RECOVERY,EQUIPPABLE,CONSUMABLE }
    from '../constants/shop.js';
import { weapons } from '../model/items/weaponsModel.js';
import { consumables } from '../model/items/consumablesModel.js';
import { player } from '../model/playerModel.js';
import { inventoryView } from '../view/inventoryView.js';
import { navigationView } from '../view/navigationView.js';

let newInventoryItem;
let isAffordable = false;

const shopController = {

    buyShortSword: function() {

        // Get weapon ref name from weaponsModel, push it to player inventory
        if (player.gold >= PRICE_SHORT_SWORD) {
            player.gold -= PRICE_SHORT_SWORD;
            newInventoryItem = { refName: weapons[1].name, category: CAT_WEAPON, type: EQUIPPABLE };
            player.inventory.push(newInventoryItem);
            newInventoryItem = null;
            isAffordable = true;
        } else {
            isAffordable = false;
        }

        // Update view on whether or not short sword was purchased
        updateViewOnPurchaseAttempt();
    },

    buyHandAxe: function() {

        // Get weapon ref name from weaponsModel, push it to player inventory
        if (player.gold >= PRICE_HAND_AXE) {
            player.gold -= PRICE_HAND_AXE;
            newInventoryItem = {refName: weapons[2].name, category: CAT_WEAPON, type: EQUIPPABLE};
            player.inventory.push(newInventoryItem);
            newInventoryItem = null;
            isAffordable = true;
        } else {
            isAffordable = false;
        }

        // Update view on whether or not hand axe was purchased
        updateViewOnPurchaseAttempt();
    },

    buyKris: function() {

        // Get weapon ref name from weaponsModel, push it to player inventory
        if (player.gold >= PRICE_KRIS) {
            player.gold -= PRICE_KRIS;
            newInventoryItem = {refName: weapons[3].name, category: CAT_WEAPON, type: EQUIPPABLE};
            player.inventory.push(newInventoryItem);
            newInventoryItem = null;
            isAffordable = true;
        } else {
            isAffordable = false;
        }

        // Update view on whether or not kris was purchased
        updateViewOnPurchaseAttempt();
    },

    buyMace: function() {

        // Get weapon ref name from weaponsModel, push it to player inventory
        if(player.gold >= PRICE_MACE) {
            player.gold -= PRICE_MACE;
            newInventoryItem = {refName: weapons[4].name, category: CAT_WEAPON, type: EQUIPPABLE};
            player.inventory.push(newInventoryItem);
            newInventoryItem = null;
            isAffordable = true;
        } else {
            isAffordable = false;
        }

        // Update view on whether or not mace is affordable
        updateViewOnPurchaseAttempt();
    }
}

function updateViewOnPurchaseAttempt() {
    if (isAffordable) {
        let newItem = player.inventory[player.inventory.length - 1].refName;
        navigationView.updateText(`You bought a brand new ${newItem}`);
        isAffordable = false;
    } else {
        navigationView.updateText(NOT_ENOUGH_GOLD);
    }
}

export { shopController };