let currentMonster;
let monsterLife;

const mobs = [
    {
        name : "creeper",
        level: 2,
        life: 30
    },
    {
        name : "Scorchling",
        level: 4,
        life: 60
    },
    {
        name : "Brute",
        level: 6,
        life: 100
    },
    {
        name : "Gnarl",
        level: 9,
        life: 140
    },
    {
        name : "Elite brute",
        level: 12,
        life: 190
    },
    {
        name : "Seer",
        level: 14,
        life: 255
    },
    {
        name : "Ogre",
        level: 17,
        life: 400
    },
    {
        name : "Boneclaw",
        level: 19,
        life: 525
    },
    {
        name : "Sludge",
        level: 25,
        life: 750
    },
    {
        name : "Gazer",
        level: 28,
        life: 850
    }
];

function fightCreeper() {
    currentMonster = 0;
    engage(currentMonster);
}

function fightScorchling() {
    currentMonster = 1;
}

function fightBrute() {
    currentMonster = 2;
}

function fightGnarl() {
    currentMonster = 3;
}

function fightEliteBrute() {
    currentMonster = 4;
}

function fightSeer() {
    currentMonster = 5;
}

function fightOgre() {
    currentMonster = 6;
}

function fightBoneClaw() {
    currentMonster = 7;
}

function fightSludge() {
    currentMonster = 8;
}

function fightGazer() {
    currentMonster = 9;
}