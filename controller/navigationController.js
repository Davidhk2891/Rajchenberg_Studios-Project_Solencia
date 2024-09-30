import { locations } from '../model/locationsModel.js';
import { inventoryView } from '../view/inventoryView.js';
import { gameView } from '../view/gameView.js';
import { shopController } from './shopController.js';

/* 
The controller handles the logic when the player clicks the "Go to Blacksmith shop" button. 
It interacts with the model (locations) and updates the view (gameView) accordingly.
*/

let isNewLocationShop = false;

const navigationController = {

    updateLocation: function(locationName) {

        // Get the location data from the model by the locationName
        const location = locations.find(
                function(location){
                    isNewLocationShop = location.name == 'Blacksmith shop' ||
                     location.name == 'General store' ? true : false;
                    return location.name === locationName
                }
            );

        // Get the location functions from the respective location object
        const buttonFunctions = location["button functions"].map(
                (funcObj) => {

                    let controller = null;

                    // Determine which controller to use
                    if (funcObj.controller === 'navigationController') {
                        controller = this;
                    } else if (funcObj.controller === 'shopController') {
                        controller = shopController;
                    }

                    // Check if the function exists in the controller
                    if (controller && typeof controller[funcObj.function] === 'function') {
                        console.log(`Function ${funcObj.function} found in ${funcObj.controller}`);
                        return controller[funcObj.function].bind(controller);
                    } else {
                        console.log(`Function ${funcObj.function} not found in ${funcObj.controller}`);
                        return () => {};
                    }

                }
        );

        // Update the view with the new location
        gameView.updateLocationText(location);
        gameView.updateButtons(location["button text"], buttonFunctions, this);

        // If the new location is a shop, open up the inventory
        console.log('location should open inventory - ' + isNewLocationShop);
        if (isNewLocationShop) {
            inventoryView.handleDrawerOpening(true);
        } else {
            inventoryView.handleDrawerOpening(false);
        }
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