'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

gulp.task('styles', [<% if(gulpUseSvgSprites) { %>'sprites', <% } %>'copy-images', 'copy-fonts'], function() {
  return buildStyles();
});

gulp.task('lint', function() {
  gulp.src([
    path.join(conf.paths.src, '/scss/**/*.scss'),<% if(gulpUseSvgSprites) { %>
    path.join('!' + conf.paths.src,  '/scss/_sprite.scss'),<% } %>
    path.join('!' + conf.paths.src, '/scss/_settings.scss')
  ])
    .pipe($.scssLint({
      'config': 'scss-lint.yml'
    }));
});

var buildStyles = function() {
  var sassOptions = {
    style: 'expanded',
    includePaths: [
      conf.paths.src + '/bower_components/foundation-sites/scss'<% if(motionui) { %>,
      conf.paths.src + '/bower_components/motion-ui'<% } %>
    ]
  };

  return gulp.src([
    path.join(conf.paths.src, '/scss/**/*.scss')
  ])
    .pipe($.sourcemaps.init())
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/styles/')));
};
