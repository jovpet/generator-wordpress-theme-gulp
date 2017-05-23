'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('critical', ['copySvg'], function() {
  return buildCritical();
});

gulp.task('critical-reload', ['critical'], function() {
  return buildCritical()
    .pipe(browserSync.stream());
});

function buildCritical() {
  return gulp.src([
    path.join(conf.paths.tmp, '/styles/critical-*.css')
  ])
    .pipe($.cssmin())
    .pipe($.regexRename(/(critical-)(.*)(\.css)/g, '$1$2.php'))
    .pipe(gulp.dest(path.join(conf.paths.src, '/critical')));
}