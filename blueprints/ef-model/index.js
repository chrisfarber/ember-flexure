var _ = require('lodash');

/**
 * EX: `ember generate model foo johndoe`
 */
module.exports = {
  description: 'Generates an ember-flexure model with example properties.',

  locals: function(options) {
    var author;

    if (!_.isPlainObject(options)) options = {};
    if (!_.isArray(options.args)) options.args = [];
    if (!_.isString(options.args[2])) options.args[2] = '[unknown]';

    var author = options.args[2];

    return {
      author: author
    };
  }
};
