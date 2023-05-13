/**
 * APPJS DOM Manipulation Library
 * @module DOM
 * @author Olawoore Emmanuel Collins
 * @link https://github.com/devbadass
 */


class DOM {
    constructor() {}

    /**
     * QuerySelects an element by using either its ID or ClassName and returns it.
     * @param {String} query Element's ID or className
     * @returns 
     */

    select(query) {
        return document.querySelector("." + query) || document.querySelector("#" + query);
    }

    /**
     * QuerySelectAll elements by using either its ID or ClassName and returns it.
     * @param {String} query Element's ID or className
     * @returns 
     */

    select_all(query) {
        const elements = document.querySelectorAll("." + query) || document.querySelectorAll("#" + query);
        return elements;
    }

    /**
     * Gets and return selected element's innerHTML
     * @param {String} selector Element's ID or className 
     * @returns 
     */

    get_html(selector) {
        const element = this.select(selector);
        return element.innerHTML;
    }

    /**
     * Adds to the innerHTML of an element
     * @param {String} selector Element's ID or className 
     * @param {String} html HTML to be added
     * @param {Number} pos_id position where it's to be added i.e {afterbegin, afterend, beforebegin, beforeend}
     * @returns 
     */

    add_html(selector, html, pos) {
        const element = this.select(selector);
        return element.insertAdjacentHTML(pos, html);
    }

    /**
     * Sets the innerHTML of an element
     * @param {String} selector Element's ID or className 
     * @param {String} html HTML to be added
     * @returns 
     */

    set_html(selector, html) {
        const element = this.select(selector);
        return element.innerHTML = html;
    }

    /**
     * Adds a new className to an element's classList.
     * @param {String} selector Element's ID or className 
     * @param {String} className new className
     * @returns 
     */

    add_class(selector, className) {
        const element = this.select(selector);
        element.classList.add(className);
    }

    /**
     * Removes className from an element's classList.
     * @param {String} selector Element's ID or className
     * @param {String} className 
     * @returns 
     */

    remove_class(selector, className) {
        const element = this.select(selector);
        element.classList.remove(className);
    }

    /**
     * Removes an element from the DOM
     * @param {String} selector Element's ID or className
     */
    remove(selector) {
        const element = this.select(selector);
        element.remove();
    }

    /**
     * Gets and return the value of an input element.
     * @param {String} selector Input element's ID or className
     * @param {Boolean} option
     */

    input_value(selector, option) {
        const element = this.select(selector);
        return element.value;
    }

    /**
     * Runs a click event the selected element
     * @param {String} selector Element's ID or className
     * @param {Function} callback 
     */

    click(selector, callback) {
        const element = this.select(selector);
        element.addEventListener("click", (evt) => {
            callback(evt);
        });
    }

    /**
     * Runs a dblclick event the selected element
     * @param {String} selector Element's ID or className
     * @param {Function} callback 
     */

    dblclick(selector, callback) {
        const element = this.select(selector);
        element.addEventListener("dblclick", (evt) => {
            callback(evt);
        });
    }

    /**
     * Runs a mousemove event the selected element
     * @param {String} selector Element's ID or className
     * @param {Function} callback 
     */

    mousemove(selector, callback) {
        const element = this.select(selector);
        element.addEventListener("mousemove", (evt) => {
            callback(evt);
        });
    }

    /**
     * Runs a touchstart event the selected element
     * @param {String} selector Element's ID or className
     * @param {Function} callback 
     */

    touchstart(selector, callback) {
        const element = this.select(selector);
        element.addEventListener("touchstart", (evt) => {
            callback(evt);
        });
    }

    /**
     * Runs a touchmove event the selected element
     * @param {String} selector Element's ID or className
     * @param {Function} callback 
     */

    touchmove(selector, callback) {
        const element = this.select(selector);
        element.addEventListener("touchmove", (evt) => {
            callback(evt);
        });
    }

    /**
     * Runs a touchend event the selected element
     * @param {String} selector Element's ID or className
     * @param {Function} callback 
     */

    touchend(selector, callback) {
        const element = this.select(selector);
        element.addEventListener("touchend", (evt) => {
            callback(evt);
        });
    }

    /**
     * Runs a change event the selected element
     * @param {String} selector Element's ID or className
     * @param {Function} callback 
     */

    change(selector, callback) {
        const element = this.select(selector);
        element.addEventListener("change", (evt) => {
            callback(evt);
        });
    }
}

export default DOM;