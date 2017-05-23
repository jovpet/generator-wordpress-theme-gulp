'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

gulp.task('babel-foundation', function () {
  return gulp.src(path.join(conf.paths.foundation, '/js/**/*.js'))
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/foundation-js')));
});