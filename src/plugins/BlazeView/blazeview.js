/**
 * BlazeView: A Lightweight, User-Friendly and Fast JavaScript Template Engine
 * @module BlazeView
 * @author Olawoore Emmanuel Collins
 * @link https://github.com/devbadass
 */

class BlazeView {
    constructor() {}

    /**
     * @param {String} Template 
     * @param {Object} data 
     * @returns 
     */
    static render(Template, data) {
        let template = Template;

        // replaces {{key}} with value
        for (let key in data) {
            const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'gi');
            template = template.replace(regex, data[key]);
        }

        //  replace {{#if key}}...{{/if}}
        const ifRegex = /{{#if\s*([\w\.]+)\s*}}([\s\S]*?){{\/if}}/gi;
        let match;
        while ((match = ifRegex.exec(template))) {
            const [matchString, key, innerTemplate] = match;
            if (!data[key]) {
                template = template.replace(matchString, '');
            } else {
                const regex = new RegExp(matchString, 'gi');
                template = template.replace(regex, innerTemplate.trim());
            }
        }


        // replace {{#eeach items}}...{{/each}}
        const eachRegex = /{{#each\s*([\w\.]+)\s*}}([\s\S]*?){{\/each}}/gi;
        while ((match = eachRegex.exec(template))) {
            const [matchString, key, innerTemplate] = match;
            const items = data[key];
            let listOutput = '';
            for (let item of items) {
                listOutput += BlazeView.render(innerTemplate, item);
            }
            const regex = new RegExp(matchString, 'gi');
            template = template.replace(regex, listOutput);
        }

        return template;
    }
}

export default BlazeView;