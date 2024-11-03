let player = {
    level : GAME_START_LEVEL,
    xp : GAME_START_XP,
    maxLevel: 500,
    life : GAME_START_HP,
    maxLife : GAME_START_MAX_HP,
    defense : 0,
    maxDefense : 0,
    mana : GAME_START_MP,
    maxMana : GAME_START_MAX_MP,
    strength : 10,
    gold : 50,
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
            refName: null,
            category: null,
            type: null
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
            "button text": ["Attack", "Special attack", "Dodge", "Flee"],
            "button functions": ["attack", "specialAttack", "dodge", "flee"],
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