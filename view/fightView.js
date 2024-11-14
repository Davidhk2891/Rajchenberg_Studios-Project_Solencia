import { gameUIMonsterStats, monsterNameText, monsterHealthText } from "../constants/domElements.js";

const fightView = {

    renderFightGraphics: function() {

    },

    renderMobStats: function(monsterName, monsterHealth) {

        gameUIMonsterStats.style.display = "block";
        monsterNameText.innerText = monsterName;
        monsterHealthText.innerText = monsterHealth;
    },

    hideMobStats: function() {

        gameUIMonsterStats.style.display = "none";
    },

    updateMobLife: function(monsterHealth) {

        monsterHealthText.innerText = monsterHealth;
    }
};

export { fightView };