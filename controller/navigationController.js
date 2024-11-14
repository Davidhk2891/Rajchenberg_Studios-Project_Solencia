import { locations } from '../model/locationsModel.js';
import { inventoryView } from '../view/inventoryView.js';
import { navigationView } from '../view/navigationView.js';
import { shopController } from './shopController.js';
import { fightController } from './fightController.js';

/* 
The controller handles the logic when the player clicks the "Go to Blacksmith shop" button. 
It interacts with the model (locations) and updates the view (navigationView) accordingly.
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
                    } else if (funcObj.controller === 'fightController') {
                        controller = fightController;
                    }

                    // Check if the function exists in the controller
                    if (controller && typeof controller[funcObj.function] === 'function') {
                        return controller[funcObj.function].bind(controller);
                    } else {
                        return () => {};
                    }

                }
        );

        // Update the view with the new location
        navigationView.updateLocationText(location);
        navigationView.updateButtons(location["button text"], buttonFunctions, this);

        // If the new location is a shop, open up the inventory
        // console.log('location should open inventory - ' + isNewLocationShop);
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