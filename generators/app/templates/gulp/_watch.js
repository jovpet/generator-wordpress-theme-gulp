'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

gulp.task('watching', ['scripts:watch', 'inject'], function () {
  gulp.watch([path.join(conf.paths.src, '/footers/footer*.php'), 'bower.json'], ['inject-reload']);

  gulp.watch([
    path.join(conf.paths.src, '/scss/*.scss')<% if (gulpUseSvgSprites) { %>,
    path.join('!' + conf.paths.src, '/scss/_sprite.scss'),
    path.join(conf.paths.src, '/assets/svg/bg-*.svg')<% } %>
  ]).on('change', function() { gulp.start('critical-reload')});

  gulp.watch([path.join(conf.paths.src, '/assets/images/**/*.{png,jpg,gif}')], ['copy-images']);
  gulp.watch([path.join(conf.paths.src, '/assets/fonts/**/*.*')], ['copy-fonts']);
  gulp.watch([
    path.join(conf.paths.src, '/assets/svg/**/*')<% if (gulpUseSvgSprites) { %>,
    path.join('!' + conf.paths.src, '/assets/svg/bg-*.svg')<% } %>
  ], ['copySvg']);

  gulp.watch([
    path.join(conf.paths.src, '/**/*.php'),
    path.join('!' + conf.paths.src, '/critical/**/*'),
    path.join('!' + conf.paths.src, '/footer*.php'),
    path.join('!' + conf.paths.src, '/footers/footer*.php')
  ], function() {
    return browserSync.reload();
  });
});

gulp.task('reload-browser', function() {
  return browserSync.reload();
});