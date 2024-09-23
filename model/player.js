import {goBlacksmith, goGeneralStore, goFortressOutskirts} from '../model/locationsModel.js';

let level = 0;
let xp = 0;
let life = 100;
let gold = 50;
let inventory = [
    {
        refName: "Small Axe",
        category: "weapon",
        type: "equippable",
    }
];

const states = [
    {
        name: "Fight mob",
        "button text": ["Attack", "Special attack", "Flee"],
        "button functions": [attack, specialAttack, flee],
        text: "You get into your fighting stance and engage the enemy."
    },
    {
        name: "Kill mob",
        "button text": ["Loot", "Leave"],
        "button functions": [loot, leave],
        "text": "The slain mob screams in agonizing pain. As it falls, its soul leaves it body and the corpse seems to get swallowed by the soil."
    },
    {
        name: "Die",
        "button text": ["Get another chance"],
        "button functions": [revive],
        text: "YOU DIED"
    },
    {
        name: "Respawn",
        "button text": ["Blacksmith", "General store", "Fortress outskirts"],
        "button functions": [goBlacksmith, goGeneralStore, goFortressOutskirts],
        text: "You wake up dizzy and disoriented. It seems like you are back in the fortress. You wonder why you are still alive."
    }
];

function updatePlayerState(state) {
    // You need to do the same approach here that you did with updatePlayerLocation
}

function engage() {
    updatePlayerState()
}

function attack() {
    
}

function specialAttack() {

}

function flee() {

}

function loot() {

}

function leave() {

}

function revive() {

}