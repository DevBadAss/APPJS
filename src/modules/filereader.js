import DOM from "../plugins/DOM/dom.js";

const dom = new DOM();

/**
 * Reads files on the client-side.
 * @param {String} element - Input element's ID or className.
 * @param {String} result_type - text, binary, buffer, or data-url.
 * @param {Function} callback - Callback function to handle the file data.
 */
function readfile(element, result_type, callback) {
    if (typeof element !== "string" || typeof callback !== "function") {
        throw new Error("Invalid parameters");
    }

    const inputElement = document.querySelector(element);

    if (!inputElement) {
        throw new Error("Element not found");
    }

    dom.change(element, (evt) => {
        const reader = new FileReader();

        reader.onload = () => {
            callback(reader.result);
        };

        reader.onerror = (error) => {
            console.error("File reading error:", error);
            // You can add error handling logic here.
        };

        switch (result_type) {
            case "text":
                reader.readAsText(evt.target.files[0]);
                break;
            case "binary":
                reader.readAsBinaryString(evt.target.files[0]);
                break;
            case "buffer":
                reader.readAsArrayBuffer(evt.target.files[0]);
                break;
            case "data-url":
                reader.readAsDataURL(evt.target.files[0]);
                break;
            default:
                throw new Error("Invalid result_type");
        }
    });
}

export default readfile;
