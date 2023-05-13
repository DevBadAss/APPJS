/**
 * @module GeoFindr A Geolocation module that gets, sets and monitors the current position of an object.
 * @class GeoFindr
 */

class GeoFindr {
    /**
     * Creates an instance of Geolocation.
     * @memberof GeoFindr
     */
    constructor() {
        this._position = {
            latitude: null,
            longitude: null
        };
    }

    /**
     * Gets the current position of the object.
     * @memberof GeoFindr
     * @param {Function} callback A function to execute after getting the current position of the object.
     * @param {Function} err An error callback.
     * @returns {Object} An object with current latitude and longitude.
     */
    getPosition(callback, err) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this._position.latitude = position.coords.latitude;
                this._position.longitude = position.coords.longitude;
                callback(this._position);
            }, (error) => {
                err(error);
            });
        } else {
            console.log("Geolocation is not supported by this browser!");
        }
    }

    /**
     * Sets the current position of the object.
     * @memberof GeoFindr
     * @param {Number} latitude - The latitude of the new position.
     * @param {Number} longitude - The longitude of the new position.
     */
    setPosition(latitude, longitude) {
        this._position.latitude = latitude;
        this._position.longitude = longitude;
    }

    /**
     * Monitors the current position of the object.
     * @memberof GeoFindr
     * @param {Function} callback - The function to be called when the position is updated.
     */
    monitorPosition(callback) {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => {
                this._position.latitude = position.coords.latitude;
                this._position.longitude = position.coords.longitude;
                callback(ths._position);
            })
        } else {
            console.log("Geolocation is not supported by this browser!");
        }
    }
}

export default GeoFindr;