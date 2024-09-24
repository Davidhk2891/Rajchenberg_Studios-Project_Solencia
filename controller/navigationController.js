import { locations } from '../model/locationsModel.js';
import { gameView } from '../view/gameView.js';

/* 
The controller handles the logic when the player clicks the "Go to Blacksmith shop" button. 
It interacts with the model (locations) and updates the view (gameView) accordingly.
*/

const navigationController = {

    updateLocation: function(locationName) {

        // Get the location data from the model
        const location = locations.find(function(location){return location.name === locationName});

        const buttonFunctions = location["button functions"].map(function(functionName) {
            return functionName;
        });

        // Update the view with the new location
        gameView.updateLocationText(location);
        gameView.updateButtons(location["button text"], buttonFunctions, this);
    },

    goFortress() {
        this.updateLocation("Fortress");
    },

    goBlacksmith() {
        this.updateLocation("Blacksmith shop");
    }
}

export { navigationController };