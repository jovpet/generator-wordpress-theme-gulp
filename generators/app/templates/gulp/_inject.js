'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

var browserSync = require('browser-sync');

gulp.task('inject-reload', ['inject'], function() {
  browserSync.reload();
});

gulp.task('inject', [<% if (foundationOverrides) { %>'babel-foundation', <% } %>'scripts', 'critical'], function () {
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/styles/*.css'),
    path.join('!' + conf.paths.tmp, '/styles/login.css'),
    path.join('!' + conf.paths.tmp, '/styles/logged-in.css'),
    path.join('!' + conf.paths.tmp, '/styles/admin-style.css'),
    path.join('!' + conf.paths.tmp, '/styles/critical-*.css')
  ], { read: false });

  var injectLogged = gulp.src([
    path.join(conf.paths.tmp, '/styles/logged-in.css')
  ], { read: false});

  var injectScripts = gulp.src([
    path.join(conf.paths.tmp, '/**/*.js')<% if (foundationOverrides) { %>,
    path.join('!' + conf.paths.tmp, '/foundation-js/**/*')<% } %>
  ], { read: false });

  var injectOptions = {
    addRootSlash: false
  };

  var injectLoggedOptions = {
    addRootSlash: false,
    starttag: '<!-- inject:logged:{{ext}} -->'
  };

  var injectRegularOptions = {
    addRootSlash: false,
    starttag: '<!-- inject:regular:{{ext}} -->'
  };

  var reTemp = new RegExp(conf.paths.tmp + '/', 'g');

  return gulp.src(path.join(conf.paths.src, '/footers/*.php'))
    .pipe($.inject(injectStyles, injectRegularOptions))
    .pipe($.inject(injectLogged, injectLoggedOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe($.replace(/(<script src=")(\.\.\/)(bower_components\/)/g, '$1<?php echo BASEURL; ?>/$3'))
    .pipe($.replace(reTemp, '<?php echo BASEURL; ?>/.tmp/'))
    .pipe($.replace(/(<script src=")(\.\.\/)(\.tmp\/)/g, '$1<?php echo BASEURL; ?>/$3'))
    .pipe(gulp.dest(conf.paths.src))
});