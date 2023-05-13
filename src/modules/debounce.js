/**
 * Creates a debounced function that delays invoking the provided function until after `delay` milliseconds have elapsed since the last time it was invoked.
 * @param {function} func - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay.
 * @returns {function} A new debounced function.
 */
function debounce(func, delay) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

export default debounce;