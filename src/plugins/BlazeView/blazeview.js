/**
 * BlazeView: A Lightweight, User-Friendly and Fast JavaScript Template Engine
 * A JavaScript template engine class that supports multiple conditionals and loops.
 * @module BlazeView
 * @author Olawoore Emmanuel Collins
 * @link https://github.com/devbadass
 */
class BlazeView {
    /**
     * Render a template with the provided data.
     *
     * @static
     * @param {string} template - The template string.
     * @param {Object} data - The data object to populate the template.
     * @returns {string} The rendered template.
     * @throws {Error} If the template contains syntax errors or if data is missing.
     * @example
     * const template = "Hello, {{name}}! {{if age}}You are {{age}} years old.{{endif}}{{foreach friends}}{{name}} is your friend.{{endforeach}}";
     * const data = {
     *   name: "Alice",
     *   age: 30,
     *   friends: [
     *     { name: "Bob" },
     *     { name: "Charlie" },
     *   ],
     * };
     * const rendered = BlazeView.render(template, data);
     * console.log(rendered);
     */
    static render(template, data) {
        try {
            let renderedTemplate = template;

            // Handle conditionals
            renderedTemplate = renderedTemplate.replace(/\{\{if (.*?)\}\}(.*?)\{\{endif\}\}/gs, (match, condition, content) => {
                return data[condition.trim()] ? content : '';
            });

            // Handle loops
            renderedTemplate = renderedTemplate.replace(/\{\{foreach (.*?)\}\}(.*?)\{\{endforeach\}\}/gs, (match, arrayName, content) => {
                if (Array.isArray(data[arrayName.trim()])) {
                    return data[arrayName.trim()]
                        .map(item => BlazeView.render(content, {...data, ...item }))
                        .join('');
                } else {
                    return '';
                }
            });

            // Handle variables
            renderedTemplate = renderedTemplate.replace(/\{\{(\w+)\}\}/g, (match, keyword) => {
                return data[keyword.trim()] || '';
            });

            return renderedTemplate;
        } catch (error) {
            throw new Error('Template rendering failed: ' + error.message);
        }
    }
}

export default BlazeView;

