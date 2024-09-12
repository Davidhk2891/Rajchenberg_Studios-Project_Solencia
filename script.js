// UI layer

// >>> DOM elements <<<
let lvlText = document.querySelector('#lvl-text');
let xpText = document.querySelector('#xp-text');

    // Content and map
let gameMapLocation = document.querySelector('#game-map-location');
let gameUIContent = document.querySelector('#game-ui-content');

    // Mob stats
let gameUIMonsterStats = document.querySelector('#game-ui-monster-stats');
let monsterNameText = document.querySelector('#monster-name-text');
let monsterHealthText = document.querySelector('#monster-health-text');

    // MP and HP meters
let hpMeter = document.getElementById('hp-meter');
let mpMeter = document.getElementById('mp-meter');

    // Dynamic controls
let gameControlsDynamicNavCont = document.querySelector('game-controls-dynamic-nav-cont');

    // Consumable slots
let consumableSlot1 = document.querySelector('#consumable-slot-1');
let consumableSlot2 = document.querySelector('#consumable-slot-2');

    // Skill slot
let skillSlot = document.querySelector('#skill-slot');

    // Player stats and Inventory buttons
let charStatsCont = document.querySelector('#char-stats-cont');
let inventoryCont = document.querySelector('#inventory-cont');

// Run game
updatePlayer(locations[0]);

