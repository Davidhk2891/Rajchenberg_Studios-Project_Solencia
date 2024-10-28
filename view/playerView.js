// Things about the player: Life bar, Mana bar and skills
/* 
export const hpMeter = document.getElementById('hp-meter');
export const mpMeter = document.getElementById('mp-meter');
*/
import { lvlText, xpText, hpMeter, mpMeter, gameUIContent } from "../constants/domElements.js";

const playerView = {

    initializeUIFromPlayerState: function(level, xp, life, mana) {

        lvlText.innerText = level;
        xpText.innerText = xp;
        hpMeter.style.height = life;
        mpMeter.style.height = mana;
    },

    updateLifeBar: function(life, updatedContent) {

        hpMeter.style.height = life;
        gameUIContent.innerText = updatedContent;
    }
}

export { playerView };