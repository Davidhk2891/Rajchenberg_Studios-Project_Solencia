let level = 0;
let xp = 0;
let life = 100;
let gold = 50;
let inventory = ["Small Axe"];

function updatePlayer(location) {
    // Pseudo code

    // Here is what you need to do:
    /* 
        1) Understand where the user wants to go. Let's say to fortress outskirts
        2) Hide the monster stats bar
        3) Get the amount of text items in the button text array
        4) based on that, you need to loop over the length of the array and for each iteration
            you need to create a button already with the proper style and set the corresponding
            button text and button function to such button. In the style you need to flex-box it horizontally
            and set a max-width such that the buttons do not go over the limits of the board.
        5) Per each iteration, concatenate the current button to the previous one using template literals.
        6) At the end of the iteration, you need to hook up an event listener to such button.
        7) updatePlayer() is going to run once as soon as the game is fired up. The default location it will
            place the player in will need to run this script as well to set the player in the Fortress.
        
    */
   gameUIMonsterStats.style.display = 'none';
   let locationActionsArrLength = locations["button text"].length;
   for (let i = 0; i <= locationActionsArrLength; i++) {
    i++;
    gameControlsDynamicNavCont.innerHTML += `
        <button id="button_one"></button>
    `;
   }
}

function attack() {

}

function specialAttack() {

}

function flee() {

}

function loot() {

}

function leave() {

}

function revive() {

}