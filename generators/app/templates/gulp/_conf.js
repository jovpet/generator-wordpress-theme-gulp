/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: 'wp-content/themes/<%= name %>',
  dist: 'wp-content/themes/<%= name %>-build',
  tmp: 'wp-content/themes/<%= name %>/.tmp',<% if (foundationOverrides) { %>
  foundation: 'wp-content/themes/<%= name %>/bower_components/foundation-sites',<% } %>
  proxy: '<%= localURL %>',
  scsslint: './scss-lint.yml'
};

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  directory: 'wp-content/themes/<%= name %>/bower_components'
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
