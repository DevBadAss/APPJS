/**
 * APPRouter: A Lightweight and User-Friendly Router
 * @module APPRouter
 * @author Olawoore Emmanuel Collins
 * @link https://github.com/devbadass
 */

class APPRouter {
  /**
   * Create a APPRouter instance.
   * @constructor
   * @param {Object} app - The application object with a renderView method.
   */
  constructor(app) {
    /**
     * The application object with a renderView method.
     * @member {Object}
     */
    this.app = app;

    /**
     * An object to store route configurations.
     * @member {Object}
     * @private
     */
    this.routes = {};

    /**
     * The default route to navigate to when no matching route is found.
     * @member {string}
     * @private
     */
    this.defaultRoute = null;

    /**
     * An object to store error handlers for different error types.
     * @member {Object}
     * @private
     */
    this.errorHandlers = {};
  }

  /**
   * Add a route to the router.
   * @param {string} route - The route URL.
   * @param {string} view - The view to render when this route is matched.
   * @param {Function} [guard=null] - An optional route guard function.
   */
  addRoute(route, view, guard = null) {
    /**
     * Route configuration object.
     * @typedef {Object} RouteConfig
     * @property {string} view - The view to render when the route is matched.
     * @property {Function} guard - An optional route guard function.
     */

    /**
     * Route configuration for the specified route.
     * @type {RouteConfig}
     */
    this.routes[route] = { view, guard };
  }

  /**
   * Set a default route that will be navigated to when no matching route is found.
   * @param {string} route - The default route URL.
   */
  setDefaultRoute(route) {
    /**
     * The default route URL.
     * @member {string}
     */
    this.defaultRoute = route;
  }

  /**
   * Add an error handler for a specific error type.
   * @param {string} errorType - The type of error.
   * @param {Function} errorHandler - The error handling function for the given error type.
   */
  addErrorHandler(errorType, errorHandler) {
    /**
     * Error handling function for the specified error type.
     * @typedef {Function} ErrorHandler
     * @param {string} error - The error message to handle.
     */

    /**
     * Error handler for a specific error type.
     * @type {ErrorHandler}
     */
    this.errorHandlers[errorType] = errorHandler;
  }

  /**
   * Handle errors based on their error type.
   * @param {string} errorType - The type of error.
   * @param {string} error - The error message to handle.
   */
  handleError(errorType, error) {
    if (this.errorHandlers[errorType]) {
      this.errorHandlers[errorType](error);
    } else {
      console.error(error); // Fallback to console logging if no specific handler is found
    }
  }

  /**
   * Navigate to a specific route.
   * @param {string} route - The route URL to navigate to.
   */
  navigateTo(route) {
    const routeConfig = this.routes[route];
    if (routeConfig) {
      if (routeConfig.guard && !routeConfig.guard()) {
        this.handleError("AccessDenied", "Access Denied");
      } else {
        this.app.renderView(routeConfig.view);
      }
    } else {
      this.handleError("RouteNotFound", "Route Not Found");
    }
  }

  /**
   * Start the router by listening to hash changes and navigating to the initial route.
   */
  start() {
    window.addEventListener("hashchange", () => {
      const newRoute = window.location.hash.slice(1);
      this.navigateTo(newRoute || this.defaultRoute);
    });

    const initialRoute = window.location.hash.slice(1);
    this.navigateTo(initialRoute || this.defaultRoute);
  }
}

// Usage Example:

// const app = {
//   renderView: (view) => {
//     // Simulate rendering a view
//     console.log(`Rendering view: ${view}`);
//   },
// };

// const router = new APPRouter(app);

// router.addRoute("/", "home");
// router.addRoute("/about", "about", () => {
//   return confirm("Access About?");
// });

// router.setDefaultRoute("/");

// // Custom error handlers for different error types
// router.addErrorHandler("AccessDenied", (error) => {
//   alert(`Access Denied: ${error}`);
// });

// router.addErrorHandler("RouteNotFound", (error) => {
//   alert(`Route Not Found: ${error}`);
// });

// router.start();



export default APPRouter;
