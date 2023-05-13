/**
 * Generates a random ID
 * @param {Number} length id length
 * @author Olawoore Emmanuel Collins
 * @link https://github.com/devbadass
 */

function ID(length) {

    let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let id = "";

    for (let i = 0; i < length; i++) {
        let generate = letters[Math.floor(Math.random() * 64)];
        id += generate;
    }
    return id;

}

/**
 * Generates unique ID
 * @param {Number} length uuid length
 * @author Olawoore Emmanuel Collins
 */

function uuid(length) {
    return ID(length) + "-" + ID(length) + "-" + ID(length)
}

const id_functions = {
    id: ID,
    uuid: uuid
}

export default id_functions;