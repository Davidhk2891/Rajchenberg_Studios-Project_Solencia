/* 
The model stores data about the locations.
Here's the part of the model that defines the "Blacksmith shop."
*/ 

const locations = [
    {
        name: "Fortress",
        "button text": ["Blacksmith", "General store", "Fortress outskirts"],
        "button functions": [
            {controller: "navigationController", function: "goBlacksmith"},
            {controller: "navigationController", function: "goGeneralStore"},
            {controller: "navigationController", function: "goFortressOutskirts"}
        ],
        text: "You are in the Fortress. You see a sign that says 'General Store'. You also see an entrance to a cave far in the horizon"
    },
    {
        name: "Blacksmith shop",
        "button text": ["Short sword (230 gold)", "Hand axe (610 gold)", "Kris (1,600)", "Mace (1,900 gold)", "Back to Fortress"],
        "button functions": [
            {controller: "shopController", function: "buyShortSword"},
            {controller: "shopController", function: "buyHandAxe"},
            {controller: "shopController", function: "buyKris"},
            {controller: "shopController", function: "buyMace"}, 
            {controller: "navigationController", function: "goFortress"}        
        ],
        text: "You walk into the blacksmith shop. It smells terrible."
    },
    {
        name: "General store",
        "button text": ["Buy apple (5 gold)", "Buy life potion (10 gold)", "Back to Fortress"],
        "button functions": [
            {controller: "shopController", function: "buyApple"},
            {controller: "shopController", function: "buySmallHealthPotion"},
            {controller: "navigationController", function: "goFortress"}
        ],
        text: "You walk into the General store. The clerk looks irritated to see you."
    },
    {
        name: "Fortress outskirts",
        "button text": ["Fight Creeper", "Fight Scorchling", "Back to Fortress", "To Solencia plains"],
        "button functions": [
            {controller: "fightController", function: "fightCreeper"},
            {controller: "fightController", function: "fightScorchling"},
            {controller: "navigationController", function: "goFortress"},
            {controller: "navigationController", function: "goSolenciaPlains"}
        ],
        text: "You are in the outskirts. It's unnervingly calm. You draw your equipped weapon."
    },
    {
        name: "Solencia Plains",
        "button text": ["Fight Brute", "Fight Gnarl", "Fight Elite Brute", "Back to Fortress Outskirts", "To Quiet forest"],
        "button functions": [
            {controller: "fightController", function: "fightBrute"},
            {controller: "fightController", function: "fightGnarl"},
            {controller: "fightController", function: "fightEliteBrute"},
            {controller: "navigationController", function: "goFortressOutskirts"},
            {controller: "navigationController", function: "goQuietForest"}
        ],
        text: "You keep walking and reach the Solencia Plains. It looks pretty. And it'd be perfect for a picnic... If it wasn't for the messed up creatures roaming around and looking for easy prey."
    },
    {
        name: "Quiet Forest",
        "button text": ["Fight Elite Brute", "Fight Ogre", "Back to Solencia Plains", "To Putrid Graveyard"],
        "button functions": [
            {controller: "fightController", function: "fightEliteBrute"},
            {controller: "fightController", function: "fightEliteBrute"},
            {controller: "fightController", function: "goSolenciaPlains"},
            {controller: "fightController", function: "goPutridGraveyard"}
        ],
        text: "You reach the infamous Quiet Forest. As rumored, it is indeed dead quiet. The only noises you can identify are those of the horrid creatures lurking between the tall trees. You see them from afar. A shivering feeling rushes down your spine. You feel cold. You carry on."
    },
    {
        name: "Putrid Graveyard",
        "button text": ["Fight Seer", "Fight Boneclaw", "Back to Quiet Forest", "To Dungeon"],
        "button functions": [
            {controller: "fightController", function: "fightSeer"},
            {controller: "fightController", function: "fightBoneClaw"},
            {controller: "navigationController", function: "goQuietForest"},
            {controller: "navigationController", function: "goDungeon"}
        ],
        text: "As you walk with your weapon drawn, you step onto some bones. you look up and see nothing but graves. The crackling sounds alert the undead. You are sweating cold and piss your pants. You also hear screams coming out of a cave up north. Also the smell... Did I mention the smell?"
    },
    {
        name: "Dungeon",
        "button text": ["Fight Seer", "Fight Boneclaw", "Fight Sludge", "Fight Gazer", "Back to Putrid graveyard"],
        "button functions": [
            {controller: "fightController", function: "fightSeer"},
            {controller: "fightController", function: "fightBoneClaw"},
            {controller: "fightController", function: "fightSludge"},
            {controller: "fightController", function: "fightGazer"},
            {controller: "navigationController", function: "goPutridGraveyard"}
            
        ],
        text: "You notice that a grave is dug up and it looks like the entrance to a cave. For some reason, you decide to jump into it. You can no longer taste the bad smell. However, you do see the undead and horrid creatures guarding this place. They see you now. You also realize the screams where coming from here."
    }
]

export { locations };