import { player } from "../model/playerModel.js";
import { mobs } from "../model/mobs/mobs.js";
import { weapons } from "../model/items/weaponsModel.js";
import { fightView } from "../view/fightView.js";
import { playerView } from "../view/playerView.js";

let currentMob;
const fightController = {

    engageMob: function(mobIndex) {

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
        // Render action buttons and pass the functions
        fightView.updatePlayerStateButtons(fightState["button text"], buttonFunctions);
        // Load relevant mob data into fightView
        fightView.renderMobStats(mobName, mobLife);
    },

    attack: function() {

        // Establish event to UI. Need: gameUIContent, weapon from equippedGear
        let mobGreeting = `A ${mobs[currentMob]} is attacking you.`;
        let playerGreeting = null; 
        if (player.equippedGear.weapon.refName != null) {
            playerGreeting = `You strike back with your ${player.equippedGear.weapon.refName}`;
        } else {
            playerGreeting = `You strike back with your bare hands. Good luck with that mate.`;
        }
        fightGreeting = mobGreeting + " " + playerGreeting;
        fightView.updatePlayerStateText(fightGreeting);

        // Define mob dealing damage to player. Need: getMobAttackValue(), mobs[currentMonster], player.life
        player.life -= this.getMobAttackValue(mobs[currentMob].level);
        playerView.updateLifeBar(player.life);

        // Define player dealing damage to mob. Need: isMonsterHit(), weapon from equippedGear, mobLife, mobLifeText, gameUIContent
        if (this.isMobToBeHit()) {
            /* 
            if (isMonsterHit()) {
                let damageDealt = weapons[currentWeapon].damage + Math.floor(Math.random() * xp) + 1
                monsterLife -= damageDealt;
                monsterLifeText.innerText = monsterLife;
                text.innerText += "\n\n" + "You deal " + damageDealt + " damage."; 
            } else {
                text.innerText += "\n\n" + "You missed.";
            }
            */

            let equippedWeaponDamage = null;
            weapons.forEach((weapon, index) => {
                if (weapon.name == player.equippedGear.weapon.refName)
                    equippedWeaponDamage = weapon.damage;                
            });
            if (equippedWeaponDamage == null)
                equippedWeaponDamage = 1;

            let damageDealt = equippedWeaponDamage + Math.floor(Math.random() * xp) + 1;
            // Create an instance of monster life
        }

        // Check player's current life. Need: playerState.die(), playerState.killMonster()

        // Run weapon breaking odds. Need: weapon break rate, player.inventory
        /* 
        function attack() {
            
            // Define mob dealing damage to player
            life -= getMonsterAttackValue(monsters[currentMonster].level);
            lifeText.innerText = life;
            
            // Define player dealing damage to mob
            if (isMonsterHit()) {
                let damageDealt = weapons[currentWeapon].damage + Math.floor(Math.random() * xp) + 1
                monsterLife -= damageDealt;
                monsterLifeText.innerText = monsterLife;
                text.innerText += "\n\n" + "You deal " + damageDealt + " damage."; 
            } else {
                text.innerText += "\n\n" + "You missed.";
            }
            
            // Check player's current life
            if (life <= 0) {
                die();
            } else if (monsterLife <= 0) {
                killMonster();
            }
            
            // Weapon breaking odds
            if (Math.random() == weaponBreakRate && inventory.length > 1) {
                let brokenWeapon = inventory.pop();
                text.innerText = "Your " + brokenWeapon + " just broke. Tough luck champ...";
                currentWeapon--;
            }
        }
        */  
    },

    getMobAttackValue: function(mobLevel) {

        let hit = (mobLevel * MONSTER_HIT_RATE) - (Math.floor(Math.random() * player.xp));
        console.log(`${mobs[currentMob].name} deals ${hit} damage to you`);
        return hit > 0 ? hit : 0;
    },

    isMobToBeHit: function() {
    
        return Math.random() >= PLAYER_HIT_RATE_DIFF || player.life < 20;
    },

    fightCreeper: function() {
        currentMob = 0;
        this.engageMob(currentMob);
    },
    
    fightScorchling: function() {
        currentMob = 1;
        this.engageMob(currentMob);
    },
    
    fightBrute: function() {
        currentMob = 2;
    },
    
    fightGnarl: function() {
        currentMob = 3;
    },
    
    fightEliteBrute: function() {
        currentMob = 4;
    },
    
    fightSeer: function() {
        currentMob = 5;
    },
    
    fightOgre: function() {
        currentMob = 6;
    },
    
    fightBoneClaw: function() {
        currentMob = 7;
    },
    
    fightSludge: function() {
        currentMob = 8;
    },
    
    fightGazer: function() {
        currentMob = 9;
    }
}

export { fightController };