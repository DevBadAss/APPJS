import DOM from "../plugins/DOM/dom.js";

const dom = new DOM();

/**
 * Reads files on client-side
 * @param {String} element Input element's ID or className
 * @param {String} result_type text or buffer or binary or data-url
 * @param {Function} callback 
 */

function readfile(element, result_type, callback) {

    dom.change(element, (evt) => {
        console.log(evt)
        const reader = new FileReader();

        reader.onload = () => {
            callback(reader.result);
        }

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
        }
    });

}

export default readfile;