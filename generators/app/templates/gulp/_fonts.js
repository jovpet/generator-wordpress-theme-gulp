'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

gulp.task('copy-fonts', function() {
  return gulp.src(path.join(conf.paths.src, '/assets/fonts/**/*.*'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/assets/fonts')))
});