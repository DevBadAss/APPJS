/**
 * ClicknHold enables clicking and holding effect on mobile and desktop web apps.
 * @module ClicknHold
 * @author Olawoore Emmanuel Collins
 * @link https://github.com/devbadass
 */

class ClicknHold {
    constructor(target, callback) {
        this.target = target;
        this.callback = callback;
        this.onHold = false;
        this.activeTimeoutId = null;

        ["mousedown", "touchstart"].forEach(evt => {
            this.target.addEventListener(evt, this._HoldStart.bind(this));
        });

        ["mouseup", "mouseleave", "touchend", "touchcancel"].forEach(evt => {
            this.target.addEventListener(evt, this._HoldEnd.bind(this));
        });
    }

    /**
     * Function to run when an element is clicked and held.
     */

    _HoldStart() {
        this.onHold = true;
        this.activeTimeoutId = setTimeout(() => {
            if (this.onHold === true) {
                this.callback();
            }
        }, 1000);
    }

    /**
     * Function to run when an element is no longer clicked or held.
     */

    _HoldEnd() {
        this.onHold = false;
        clearTimeout(this.activeTimeoutId);
    }
}

export default ClicknHold;