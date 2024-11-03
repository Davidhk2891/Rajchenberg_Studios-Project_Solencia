import { gameMapLocation, gameUIContent, gameControlsDynamicNavCont } from '../constants/domElements.js';

/*
The view is responsible for updating the UI. 
It updates the location text and buttons whenever the player moves to a new location.
*/

const navigationView = {

    updateText: function(text) {
        gameUIContent.innerText = text;
    },
    
    updateLocationText: function(location) {
        
        gameMapLocation.innerText = location.name;
        gameUIContent.innerText = location.text;
    },

    updateButtons: function(buttonText, buttonFunctions) {
        
        gameControlsDynamicNavCont.innerHTML = ''; // Clear previous buttons
        buttonText.forEach(function(text, index) {
            const button = document.createElement('button');
            button.style.cursor = "pointer";
            button.style.border = " 4px groove black";
            button.innerText = text;
            button.addEventListener('click', buttonFunctions[index]); // Attach the button function
            gameControlsDynamicNavCont.appendChild(button); // Add button to the UI
        });        
    }
}

export { navigationView };