'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

gulp.task('copy-images', function() {
  return gulp.src(path.join(conf.paths.src, '/assets/images/**/*.{png,jpg,gif}'))
    .pipe($.imagemin())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/assets/images')))
});