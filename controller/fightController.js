import { player } from "../model/playerModel.js";
import { mobs } from "../model/mobs/mobsModel.js";
import { weapons } from "../model/items/weaponsModel.js";
import { playerStateController } from "./playerStateController.js";
import { fightView } from "../view/fightView.js";
import { playerView } from "../view/playerView.js";

let fightStateUI;
let mobIndex = 0;
let currentMob = {
    mobName : mobs[mobIndex].name,
    mobLife : mobs[mobIndex].life,
    mobLevel : mobs[mobIndex].level
};
const fightController = {

    engageMob: function() {

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
        playerView.updatePlayerStateText(fightState.text);
        // Render action buttons and pass the functions
        playerView.updatePlayerStateButtons(fightState["button text"], buttonFunctions);
        // Load relevant mob data into fightView
        fightView.renderMobStats(mobName, mobLife);
    },

    attack: function() {

        // Establish event to UI
        let mobGreeting = `A ${currentMob.mobName} is attacking you.`;
        let playerGreeting = null; 
        if (player.equippedGear.weapon.refName != null) {
            playerGreeting = `You strike back with your ${player.equippedGear.weapon.refName}`;
        } else {
            playerGreeting = `You strike back with your bare hands. Good luck with that mate.`;
        }
        fightStateUI = mobGreeting + " " + playerGreeting;

        // Define player dealing damage to mob
        if (this.isMobToBeHit()) {
            let equippedWeaponDamage = null;
            weapons.forEach((weapon) => {
                if (weapon.name == player.equippedGear.weapon.refName)
                    equippedWeaponDamage = weapon.damage;                
            });
            if (equippedWeaponDamage == null) {
                //  This means the player is fighting without an equipped weapon. Bare hands.
                equippedWeaponDamage = 1;
            }
            let damageDealt = equippedWeaponDamage + Math.floor(Math.random() * player.xp) + 1;
            
            // Apply damage dealt to mob
            currentMob.mobLife -= damageDealt;
            // Update mob health UI
            fightView.updateMobLife(currentMob.mobLife);
            fightStateUI += `\n\n\n> You hit back at the ${currentMob.mobName} and deal ${damageDealt} DMG to it.`;
        } else {
            fightStateUI += `\n\n\n> You attempt to hit back at the ${currentMob.mobName} but you miss...`;
        }

        // Define mob dealing damage to player
        if (this.isPlayerToBeHit()) {
            let mobHitPoints = this.getMobAttackValue(currentMob.mobLevel);
            player.life -= mobHitPoints;
            let UIReadyLife = player.life.toString() + "%";
            playerView.updateLifeBar(UIReadyLife);
            fightStateUI += `\n\n\n> The ${currentMob.mobName} hits you and you lose ${mobHitPoints}HP...`;
            if (player.life < 20) {
                fightStateUI += `\nYou are bleeding pretty bad...`;
            } else if (player.life < 10) {
                fightStateUI += `\nYou are bleeding out fast and starting to feel light-headed...`;
            }
        } else {
            fightStateUI += `\n\n\n> The ${currentMob.mobName} attacks you... but misses.`;
        }

        // Check player's current life. Need: playerState.die(), playerState.killMonster()
        if (player.life <= 0) {

            // Player died.
            this.playerDies();
        } else if (currentMob.mobLife <= 0) {

            // Mob died.
            this.killMob();
        }

        // Run weapon breaking odds. Need: weapon break rate, player.inventory
        /* 
        function attack() {
            
            // Weapon breaking odds
            if (Math.random() == weaponBreakRate && inventory.length > 1) {
                let brokenWeapon = inventory.pop();
                text.innerText = "Your " + brokenWeapon + " just broke. Tough luck champ...";
                currentWeapon--;
            }
        }
        */
       
        // Update fight state UI
        playerView.updatePlayerStateText(fightStateUI);
    },

    getMobAttackValue: function(mobLevel) {

        // Starting the game this is 10 - 0. So minimum possible hit from mob is 10. Leave this as is for now.
        let hit = (mobLevel * MONSTER_HIT_RATE) - (Math.floor(Math.random() * player.xp));
        return hit > 0 ? hit : 0;
    },

    isMobToBeHit: function() {
    
        return Math.random() <= PLAYER_HIT_RATE || player.life < 20 ? true : false;
    },

    isPlayerToBeHit: function() {

        return Math.random() <= MOB_HIT_RATE || currentMob.mobLife < (currentMob.mobLife / 3) ? true : false;
    },

    playerDies: function() {

        playerStateController.killPlayer();
    },

    killMob: function() {

    },

    fightCreeper: function() {
        mobIndex = 0;
        this.engageMob(mobIndex);
    },
    
    fightScorchling: function() {
        mobIndex = 1;
        this.engageMob(mobIndex);
    },
    
    fightBrute: function() {
        mobIndex = 2;
        this.engageMob(mobIndex);
    },
    
    fightGnarl: function() {
        mobIndex = 3;
    },
    
    fightEliteBrute: function() {
        mobIndex = 4;
    },
    
    fightSeer: function() {
        mobIndex = 5;
    },
    
    fightOgre: function() {
        mobIndex = 6;
    },
    
    fightBoneClaw: function() {
        mobIndex = 7;
    },
    
    fightSludge: function() {
        mobIndex = 8;
    },
    
    fightGazer: function() {
        mobIndex = 9;
    }
}

export { fightController };