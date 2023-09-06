/**
 * BlazeView: A Lightweight, User-Friendly and Fast JavaScript Template Engine
 * A JavaScript template engine class that supports multiple conditionals and loops.
 * @module BlazeView
 * @author Olawoore Emmanuel Collins
 * @link https://github.com/devbadass
 */
class BlazeView
 */
class BlazeView {
  /**
   * Render a template with the provided data.
   *
   * @static
   * @param {string} template - The template string.
   * @param {Object} data - The data object to populate the template.
   * @returns {string} The rendered template.
   * @throws {Error} If the template contains syntax errors.
   * @example
   * const template = "Hello, {{name}}! {{if age}}You are {{age}} years old.{{endif}}";
   * const data = { name: "Alice", age: 30 };
   * const rendered = BlazeView.render(template, data);
   * console.log(rendered); // Output: "Hello, Alice! You are 30 years old."
   */
  static render(template, data) {
    try {
      // Handle variables
      const renderedTemplate = template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
        if (data.hasOwnProperty(key)) {
          return data[key];
        } else {
          return '';
        }
      });

      // Handle conditionals
      const withConditionals = renderedTemplate.replace(/\{\{if (.*?)\}\}(.*?)\{\{endif\}\}/gs, (match, condition, content) => {
        return data[condition] ? content : '';
      });

      // Handle loops
      const withLoops = withConditionals.replace(/\{\{foreach (.*?)\}\}(.*?)\{\{endforeach\}\}/gs, (match, arrayName, content) => {
        if (Array.isArray(data[arrayName])) {
          return data[arrayName].map(item => BlazeView.render(content, { ...item, ...data })).join('');
        } else {
          return '';
        }
      });

      return withLoops;
    } catch (error) {
      throw new Error('Template rendering failed: ' + error.message);
    }
  }
}


// const template = "Hello, {{name}}! {{if age}}You are {{age}} years old.{{endif}}{{foreach friends}}{{name}} is your friend.{{endforeach}}";
// const data = {
//   name: "Alice",
//   age: 30,
//   friends: [
//     { name: "Bob" },
//     { name: "Charlie" },
//   ],
// };

// try {
//   const rendered = BlazeView.render(template, data);
//   console.log(rendered);
// } catch (error) {
//   console.error(error.message);
// }


export default BlazeView;

