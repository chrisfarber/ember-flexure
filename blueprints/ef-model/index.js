var _ = require('lodash');

/**
 * EX: `ember generate model foo --author="johndoe"`
 */
module.exports = {
  description: 'Generates an ember-flexure model with example properties.',

  locals: function(options) {
    if (!_.isPlainObject(options)) options = {};
    if (!_.isPlainObject(options.entity)) options.entity = {};
    if (!_.isString(options.entity.name)) options.entity.name = 'model';
    if (!_.isPlainObject(options.entity.options)) options.entity.options = {};
    if (!_.isString(options.entity.options.author)) options.entity.options.author = '[unknown]';
    return options.entity.options;
  }
};
