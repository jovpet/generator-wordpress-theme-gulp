'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('lint', function() {
  return gulp.src([
    path.join(conf.paths.src, '/scss/**/*.scss')<% if (gulpUseSvgSprites) { %>,
    path.join('!' + conf.paths.src, '/scss/**/_sprite.scss')<% } %>
  ])
    .pipe($.scsslint({
      'config': conf.paths.scsslint
    }))
    .pipe($.scsslint.reporter());
});