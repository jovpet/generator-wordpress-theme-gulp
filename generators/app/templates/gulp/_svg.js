'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var svgminSettings = {
  plugins: [{
    removeDoctype: true
  }, {
    removeComments: true
  }, {
    convertShapeToPath: false
  }, {
    convertStyleToAttrs: false
  }]
};

var $ = require('gulp-load-plugins')();
<% if (gulpUseSvgSprites) { %>
gulp.task('sprites', function() {
  return gulp.src(path.join(conf.paths.src, '/assets/svg/bg-*.svg'))
    .pipe($.svgSprite({
      mode: {
        css: { // Activate the «symbol» mode
          dest: '../',
          sprite: '../assets/svg/sprite',
          bust: true,
          prefix: '@mixin svg-%s',
          layout: 'vertical',
          render: {
            css: false, // Activate CSS output (with default options)
            scss: {
              dest: '../../scss/_sprite.scss'
            }
          }
        }
      }
    }))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/assets/svg')))
    .pipe($.size());
});
<% } %>

gulp.task('svg', ['cleanFooter'], function() {
  return buildSvg();
});

gulp.task('copySvg', ['styles'], function() {
  buildSvg();
});

function buildSvg() {
  return gulp.src([
    path.join(conf.paths.src, '/assets/svg/**/*.svg')<% if (gulpUseSvgSprites) { %>,
    path.join('!' + conf.paths.src, '/assets/svg/**/bg-*.svg')<% } %>
  ])
    .pipe($.svgmin(svgminSettings))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/assets/svg')))
    .pipe($.size());
}