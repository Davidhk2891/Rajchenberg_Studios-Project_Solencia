let level = 0;
let xp = 0;
let life = 100;
let gold = 50;
let inventory = ["Small Axe"];

const states = [
    {
        name: "Fight mob",
        "button text": ["Attack", "Special attack", "Flee"],
        "button functions": [attack, specialAttack, flee],
        text: "You get into your fighting stance and engage the enemy."
    },
    {
        name: "Kill mob",
        "button text": ["Loot", "Leave"],
        "button functions": [loot, leave],
        "text": "The slain mob screams in agonizing pain. As it falls, its soul leaves it body and the corpse seems to get swallowed by the soil."
    },
    {
        name: "Die",
        "button text": ["Get another chance"],
        "button functions": [revive],
        text: "YOU DIED"
    },
    {
        name: "Respawn",
        "button text": ["Blacksmith", "General store", "Fortress outskirts"],
        "button functions": [goBlacksmith, goGeneralStore, goFortressOutskirts],
        text: "You wake up dizzy and disoriented. It seems like you are back in the fortress. You wonder why you are still alive."
    }
];

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
   let locationBtnNamesArrLength = location["button text"].length - 1;
   for (let i = 0; i <= locationBtnNamesArrLength; i++) {

    // Create button element
    let button = document.createElement('button');
    button.innerText = location["button text"][i];
    button.id = `button${i}`;

    // Append button to predetermined div element
    gameControlsDynamicNavCont.appendChild(button);

    // Add event listener to newly create x button
    button.addEventListener('click', function(){
        location["button functions"][i]();
    });
   }

   // Add location text
   gameUIContent.innerText = location.text;
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