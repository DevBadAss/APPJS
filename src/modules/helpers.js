/**
 * APPJS Helper Module
 */

const {
    log,
    error,
    info,
    warn,
    assert,
    clear,
    count,
    group,
    groupCollapsed,
    groupEnd,
    table,
    time,
    timeEnd
} = console;

const {
    assign,
    reload,
    replace,
    search,
    pathname,
    hostname,
    protocol,
    hash,
    origin
} = location;

/**
 * Truncates a string to the specified length and adds an ellipsis to the end.
 * @param {String} str - The string to truncate
 * @param {Number} length - The maximum length of the truncated string.
 * @returns {String} The truncated string.
 */
function truncate(str, length) {
    if (str.length > length) {
        return str.substring(0, length) + "...";
    } else {
        return str;
    }
}


export {
    log,
    error,
    info,
    warn,
    assert,
    clear,
    count,
    group,
    groupCollapsed,
    groupEnd,
    table,
    time,
    timeEnd,
    assign,
    reload,
    replace,
    search,
    pathname,
    hostname,
    protocol,
    hash,
    origin,
    truncate
}