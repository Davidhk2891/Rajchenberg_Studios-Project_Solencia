// Things about the player: Life bar, Mana bar and skills
/* 
export const hpMeter = document.getElementById('hp-meter');
export const mpMeter = document.getElementById('mp-meter');
*/
import { lvlText, xpText, hpMeter, mpMeter, gameUIContent, gameControlsDynamicNavCont } from "../constants/domElements.js";

const playerView = {

    initializeUIFromPlayerState: function(level, xp, life, mana) {

        lvlText.innerText = level;
        xpText.innerText = xp;
        hpMeter.style.height = life;
        mpMeter.style.height = mana;
    },

    updateLifeBar: function(life, updatedContent = null) {

        hpMeter.style.height = life;
        if (updatedContent != null)
            gameUIContent.innerText = updatedContent;
    },

    updatePlayerStateText: function(stateContent) {

        // Render fighting state text
        gameUIContent.innerText = stateContent;
    },

    updatePlayerStateButtons: function(buttonsText, buttonsCallbacks) {

        // Render button text and functions
        gameControlsDynamicNavCont.innerText = '';
        buttonsText.forEach(function(text, index) {
            
            const button = document.createElement('button');
            button.style.cursor = "pointer";
            button.style.border = "4px groove black";
            button.innerText = text;
            gameControlsDynamicNavCont.appendChild(button);
            // The listener should be in the controller
            button.addEventListener('click', buttonsCallbacks[index]);
        });
    }
}

export { playerView };