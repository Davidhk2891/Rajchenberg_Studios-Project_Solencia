import { gameUIContent, gameControlsDynamicNavCont, gameUIMonsterStats, monsterNameText, monsterHealthText } from "../constants/domElements.js";

const fightView = {

    updatePlayerStateText: function(stateContent) {

        // Render fighting state text
        gameUIContent.innerText = stateContent;
    },

    updatePlayerStateButtons: function(buttonsText, buttonsFunctions) {

        // Render button text and functions
        gameControlsDynamicNavCont.innerText = '';
        buttonsText.forEach(function(text, index) {
            
            const button = document.createElement('button');
            button.style.cursor = "pointer";
            button.style.border = "4px groove black";
            button.innerText = text;
            gameControlsDynamicNavCont.appendChild(button);
            button.addEventListener('click', buttonsFunctions[index]);
        });
    },

    renderFightGraphics: function() {

    },

    renderMobStats: function(monsterName, monsterHealth) {

        gameUIMonsterStats.style.display = "block";
        monsterNameText.innerText = monsterName;
        monsterHealthText.innerText = monsterHealth;
    }
};

export { fightView };