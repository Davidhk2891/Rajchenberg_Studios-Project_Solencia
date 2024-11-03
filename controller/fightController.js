import { player } from "../model/playerModel.js";
import { mobs } from "../model/mobs/mobs.js";
import { fightView } from "../view/fightView.js";

let currentMonster;
const fightController = {

    fightMob: function(mobIndex) {

        // Get mob data
        let mobName = mobs[mobIndex].name;
        let mobLife = mobs[mobIndex].life;
        // Get player state model for fighting a mob
        let fightState = player.states[0];

        // Get the correct button functions and return them
        const buttonFunctions = fightState["button functions"].map((funcObj) => {

            if (typeof this[funcObj] === 'function') {
                return this[funcObj].bind(this);
            }
        });

        //Render player state text
        fightView.updatePlayerStateText(fightState.text);
        // Render state buttons
        fightView.updatePlayerStateButtons(fightState["button text"], buttonFunctions);
        //Load relevant data into fightView
        fightView.renderMobStats(mobName, mobLife);
    },

    attack: function() {
        console.log("Attacking...");

        // IT WORKS
        // LEFT HERE
        // REVIEW HOW YOU MADE THE BUTTON FUNCTIONS WORK...
    },

    fightCreeper: function() {
        currentMonster = 0;
        this.fightMob(currentMonster);
    },
    
    fightScorchling: function() {
        currentMonster = 1;
        this.fightMob(currentMonster);
    },
    
    fightBrute: function() {
        currentMonster = 2;
    },
    
    fightGnarl: function() {
        currentMonster = 3;
    },
    
    fightEliteBrute: function() {
        currentMonster = 4;
    },
    
    fightSeer: function() {
        currentMonster = 5;
    },
    
    fightOgre: function() {
        currentMonster = 6;
    },
    
    fightBoneClaw: function() {
        currentMonster = 7;
    },
    
    fightSludge: function() {
        currentMonster = 8;
    },
    
    fightGazer: function() {
        currentMonster = 9;
    }
}

export { fightController };