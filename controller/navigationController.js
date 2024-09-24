import { locations } from '../model/locationsModel.js';
import { gameView } from '../view/gameView.js';

/* 
The controller handles the logic when the player clicks the "Go to Blacksmith shop" button. 
It interacts with the model (locations) and updates the view (gameView) accordingly.
*/

const navigationController = {

    updateLocation: function(locationName) {

        // Get the location data from the model by the locationName
        const location = locations.find(
                function(location){
                    return location.name === locationName
                }
            );

        // Get the location functions from the respective location object
        const buttonFunctions = location["button functions"].map(
                (functionName) => {
                    if (typeof this[functionName] === 'function') {
                        return this[functionName].bind(this);
                    } else {
                        console.log(`function ${functionName} not found in navigationController`);
                        return () => {};
                    }
                }
        );

        // Update the view with the new location
        gameView.updateLocationText(location);
        gameView.updateButtons(location["button text"], buttonFunctions, this);
    },

    goFortress() {
        this.updateLocation("Fortress");
    },

    goBlacksmith() {
        this.updateLocation("Blacksmith shop");
    },

    goGeneralStore() {
        this.updateLocation("General store");
    },

    goFortressOutskirts() {
        this.updateLocation("Fortress outskirts");
    },

    goSolenciaPlains() {
        this.updateLocation("Solencia Plains");
    },

    goQuietForest() {
        this.updateLocation("Quiet Forest");
    },

    goPutridGraveyard() {
        this.updateLocation("Putrid Graveyard");
    },

    goDungeon() {
        this.updateLocation("Dungeon");
    }
}

export { navigationController };