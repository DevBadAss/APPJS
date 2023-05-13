import id_functions from "../modules/id_functions.js";
/**
 * APPJS: A Lightweight and User-Friendly JavaScript MVC Framework for Building Single Page Applications
 * @module APPJS
 * @author Olawoore Emmanuel Collins
 * @link https://github.com/devbadass
 */

class APPJS {

    constructor() {
        this.app = {
            app_names: [],
            registry: {}
        };
    }

    /**
     * @param {String} entry name of app renderer.
     */
    _init(entry) {
        this.app.app_names.push(entry);
    }

    /**
     * Creates and Add View to the app {App_Name}
     * @param {Object} view_data
     * @param {String} view_data.App_Name
     * @param {String} view_data.View_Name
     * @param {Object} view_data.Model
     * @param {Function} view_data.View
     * @param {Function} view_data.Controller
     */

    add_view(view_data = {
        App_Name,
        View_Name,
        Model,
        View,
        Controller
    }) {
        if (this.app.registry[view_data.View_Name]) {
            console.error(`${this.app.registry[view_data.View_Name].App_Name} Application already has this view!`)
        } else {
            this.app.registry[view_data.View_Name] = view_data;
            this.app.registry[view_data.View_Name].Model = this.Proxify(view_data.Model);
        }
    }

    /**
     * Renders App View
     * @param {String} view_name 
     * @returns 
     */

    render_view(view_name) {
        this.current_view = this.app.registry[view_name];
        this.current_app = document.querySelector("." + this.app.registry[view_name].App_Name) || document.querySelector("#" + this.app.registry[view_name].App_Name);

        this.update_view();
        return true;
    }

    /** 
     * Updates Current App's View
     */
    update_view() {
        if (this.current_view) {
            this.current_view.Controller(this.current_view.Model);
            this.current_app.innerHTML = this.current_view.View(this.current_view.Model);
        }
    }

    /**
     * Monitors changes in View models
     * @param {Object} model
     */
    Proxify(model) {
        return new Proxy(model, {
            set: (target, property, value) => {
                target[property] = value;
                return true;
            }
        });
    }

    /**
     * Generates and return random ID
     * @param {Number} length length of ID
     * @returns 
     */

    static rid(length) {
        return id_functions.id(length);
    }


    /**
     * Generates and return unique ID
     * @param {Number} length length of uuid
     * @returns 
     */

    static uuid(length) {
        return id_functions.uuid(length);
    }
}

export default APPJS;