/**
 * BlazeView: A Lightweight, User-Friendly and Fast JavaScript Template Engine
 * A JavaScript template engine class that supports multiple conditionals and loops.
 * @module BlazeView
 * @author Olawoore Emmanuel Collins
 * @link https://github.com/devbadass
 */
class BlazeView {
  constructor() {}

  /**
   * Renders the template with the provided data.
   * @param {Object} data - The data object to populate the template.
   * @type {string} template - The template string to be rendered
   * @returns {string} - The rendered template.
   */
  static render(template, data) {
    /**
     * Regular expression to match the variables in the template.
     * @type {RegExp}
     */
    const regex = /\{\{(.*?)\}\}/g;
    let renderedTemplate = template;

    // Replace conditionals
    renderedTemplate = renderedTemplate.replace(/\{\{if (.*?)\}\}(.*?)\{\{endif\}\}/gs, (match, condition, content) => {
      return data[condition] ? content.trim() : '';
    });

    // Replace loops
    renderedTemplate = renderedTemplate.replace(/\{\{foreach (.*?)\}\}(.*?)\{\{endforeach\}\}/gs, (match, arrayName, content) => {
      let result = '';
      if (Array.isArray(data[arrayName])) {
        const array = data[arrayName];
        for (let i = 0; i < array.length; i++) {
          const item = array[i];
          const itemData = { ...item, ...data };
          result += BlazeView.render(content, itemData);
        }
      }
      return result;
    });

    // Replace variables
    renderedTemplate = renderedTemplate.replace(regex, (match, key) => {
      return data[key] || '';
    });

    return renderedTemplate;
  }
}


export default BlazeView;
