/**
 * APPRouter: A Lightweight and User-Friendly Router
 * @module APPRouter
 * @author Olawoore Emmanuel Collins
 * @link https://github.com/devbadass
 */


class APPRouter {
    constructor(app) {
        this.app = app;
        this.routes = [];
    }

    /**
     * @param view view To Load
     * @param url route To Load
     */
    add_route(view, url) {
        this.routes.push({
            view,
            url
        });
        this.navigate();
    }


    /**
     * Watches and navigates each registered routes
     */

    navigate() {
        const {
            pathname
        } = window.location;
        for (let i = 0; i < this.routes.length; i++) {
            if (this.routes[i].url === pathname) {
                this.app.render_view(this.routes[i].view);
                return true;
            }
        }
    }

    /**
     * Loads Route
     * @param {String} route 
     */

    get(route) {
        window.location.pathname = route;
    }
}

export default APPRouter;