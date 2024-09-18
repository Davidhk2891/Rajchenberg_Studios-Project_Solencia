const consumables = [
    {
        name: "Apple",
        type: "health",
        cost: 5,
        effect: 5
    },
    {
        name: "Small health potion",
        type: "health",
        cost: 10,
        effect: 10
    },
    {
        name: "Small mana potion",
        type: "mana",
        cost: 10,
        effect: 10
    }
];

function buyApple() {
    if (gold >= 5) {
        gold -= 5;
        newInventoryItem = {refName: "Apple", category: "health", type: "consumable"};
        inventory.push(newInventoryItem);
        newInventoryItem = null;
    } else {
        gameUIcontent.text = "You don't have enough gold to afford...an apple. Get out of here you beggar!";
    }
}

function buySmallHealthPotion() {
    if (gold >= 10) {
        gold -= 10;
        newInventoryItem = {refName: "Small health potion", category: "health", type: "consumable"};
        inventory.push(newInventoryItem);
        newInventoryItem = null;
    } else {
        gameUIcontent.text = "You can't afford it mate. You haven't got 10 schmekels... I mean gold...";
    }
}

function buySmallManaPotion() {
    if (gold >= 10) {
        gold -= 10;
        newInventoryItem = {refName: "Small mana potion", category: "health", type: "consumable"};
        inventory.push(newInventoryItem);
        newInventoryItem = null;
    } else {
        gameUIContent.text = "You can't buy it at the moment. Come back when you have enough gold.";
    }
}

function purchaseItem(goldSpent, inventoryItem) {
    gold -= goldSpent;
    newInventoryItem = inventoryItem;
    inventory.push(newInventoryItem);
    newInventoryItem = null;
}