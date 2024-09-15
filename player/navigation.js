const locations = [
    {
        name: "Fortress",
        "button text": ["Blacksmith", "General store", "Fortress outskirts"],
        "button functions": [goBlacksmith, goGeneralStore, goFortressOutskirts],
        text: "You are in the Fortress. You see a sign that says 'General Store'. You also see an entrance to a cave far in the horizon"
    },
    {
        name: "Blacksmith shop",
        "button text": ["Buy weapon (30 gold)", "Sell weapon (15 gold)", "Back to Fortress"],
        "button functions": [buyWeapon, sellWeapon, goFortress],
        text: "You walk into the blacksmith shop. It smells terrible."
    },
    {
        name: "General store",
        "button text": ["Buy apple (5 gold)", "Buy life potion (10 gold)", "Back to Fortress"],
        "button functions": [buyApple, buySmallHealthPotion, goFortress],
        text: "You walk into the General store. The clerk looks irritated to see you."
    },
    {
        name: "Fortress outskirts",
        "button text": ["Fight Creeper", "Fight Scorchling", "Back to Fortress", "To Solencia plains"],
        "button functions": [fightCreeper, fightScorchling, goFortress, goSolenciaPlains],
        text: "You are in the outskirts. It's unnervingly calm. You draw your equipped weapon."
    },
    {
        name: "Solencia Plains",
        "button text": ["Fight Brute", "Fight Gnarl", "Fight Elite Brute", "Go back to Fortress Outskirts", "To the Quiet forest"],
        "button functions": [fightBrute, fightGnarl, fightEliteBrute, goFortressOutskirts, goQuietForest],
        text: "You keep walking and reach the Solencia Plains. It looks pretty. And it'd be perfect for a picnic... If it wasn't for the messed up creatures roaming around and looking for easy prey."
    },
    {
        name: "Quiet Forest",
        "button text": ["Fight Elite Brute", "Fight Ogre", "Go back to Solencia Plains", "To the Putrid Graveyard"],
        "button functions": [fightEliteBrute, fightOgre, goSolenciaPlains, goPutridGraveyard],
        text: "You reach the infamous Quiet Forest. As rumored, it is indeed dead quiet. The only noises you can identify are those of the horrid creatures lurking between the tall trees. You see them from afar. A shivering feeling rushes down your spine. You feel cold. You carry on."
    },
    {
        name: "Putrid Graveyard",
        "button text": ["Fight Seer", "Fight Boneclaw", "Go back to the Quiet Forest", "to the Dungeon"],
        "button functions": [fightSeer, fightBoneClaw, goQuietForest, goDungeon],
        text: "As you walk with your weapon drawn, you step onto some bones. you look up and see nothing but graves. The crackling sounds alert the undead. You are sweating cold and piss your pants. You also hear screams coming out of a cave up north. Also the smell... Did I mention the smell?"
    },
    {
        name: "Dungeon",
        "button text": ["Fight Seer", "Fight Boneclaw", "Fight Sludge", "Fight Gazer"],
        "button functions": [fightSeer, fightBoneClaw, fightSludge, fightGazer],
        text: "You notice that a grave is dug up and it looks like the entrance to a cave. For some reason, you decide to jump into it. You can no longer taste the bad smell. However, you do see the undead and horrid creatures guarding this place. They see you now. You also realize the screams where coming from here."
    }
]

function updatePlayer(location) {
   
    // I need to clear the buttons before reloading them
    gameControlsDynamicNavCont.innerHTML = " ";

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

// World navigation
function goFortress() {
    updatePlayer(locations[0]); 
}

function goBlacksmith() {
    updatePlayer(locations[1]);
}

function goGeneralStore() {
    
}

function goFortressOutskirts() {
    
}

function goSolenciaPlains() {

}

function goQuietForest() {

}

function goPutridGraveyard() {

}

function goDungeon() {

}