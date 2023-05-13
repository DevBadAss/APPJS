/**
 * Creates a throttled version of a function that limits the rate at which it can be called
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time in milliseconds to wait before calling the function again
 * @returns {Function} A throttled version of the original function
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const context = this;
        const args = arguments;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

export default throttle;