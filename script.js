// UI controls
/* 
const charStatsCont = document.querySelector('#char-stats-cont');
const inventoryCont = document.querySelector('#inventory-cont');
*/

let isPlayerDataWindowShowing = false;
let isPlayerInvWindowShowing = false;

charStatsCont.addEventListener('click', function(){
    if (!isPlayerDataWindowShowing) {
        playerDataWindow.style.display = "inline";
        isPlayerDataWindowShowing = true;
    } else {
        playerDataWindow.style.display = "none";
        isPlayerDataWindowShowing = false;
    }

});

inventoryCont.addEventListener('click', function(){
    if (!isPlayerInvWindowShowing) {
        playerInvWindow.style.display = "inline";
        isPlayerInvWindowShowing = true;
    } else {
        playerInvWindow.style.display = "none";
        isPlayerInvWindowShowing = false;
    }
});

// Run game
function runGame() {
    goFortress();
}

runGame();

