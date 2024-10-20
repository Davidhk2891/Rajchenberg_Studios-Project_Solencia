let player = {
    level : 0,
    xp : 0,
    life : 100,
    maxLife : 100,
    defense : 0,
    maxDefense : 0,
    mana : 50,
    maxMana : 50,
    strength : 10,
    gold : 5000,
    consumableSlots : {
        slotOne : {
            refName: null,
            category: null,
            effect: null,
            amount: 0
        },
        slotTwo : {
            refName: null,
            category: null,
            effects: null,
            amount: 0
        }
    },
    equippedGear : {
        weapon: {
            refName: "Small Axe",
            category: "weapon",
            type: "equippable"
        },
        armor: {
            refName: null,
            category: null,
            type: null
        }
    },
    inventory : [
        {
            refName: "Apple",
            category: "hp_recovery",
            type: "consumable"
        }
    ],
    states : [
        {
            name: "Fight mob",
            "button text": ["Attack", "Special attack", "Flee"],
            "button functions": ["attack", "specialAttack", "flee"],
            text: "You get into your fighting stance and engage the enemy."
        },
        {
            name: "Kill mob",
            "button text": ["Loot", "Leave"],
            "button functions": ["loot", "leave"],
            "text": "The slain mob screams in agonizing pain. As it falls, its soul leaves it body and the corpse seems to get swallowed by the soil."
        },
        {
            name: "Die",
            "button text": ["Get another chance"],
            "button functions": ["revive"],
            text: "YOU DIED"
        },
        {
            name: "Respawn",
            "button text": ["Blacksmith", "General store", "Fortress outskirts"],
            "button functions": ["goBlacksmith", "goGeneralStore", "goFortressOutskirts"],
            text: "You wake up dizzy and disoriented. It seems like you are back in the fortress. You wonder why you are still alive."
        }
    ]
}

export { player };