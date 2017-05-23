'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

var reScripts = new RegExp('<script src="', 'g');
var reStyles = new RegExp('<link rel="stylesheet" href="', 'g');
var reRest = new RegExp(conf.paths.src, 'g');

gulp.task('compile', ['inject', 'other'], function() {
  return gulp.src(path.join(conf.paths.src, '/**/*.php'))
    .pipe($.replace(/("<\?php echo BASEURL; \?>)/g, '"' + conf.paths.src))
    .pipe($.useref())
    .pipe($.if('**/*.js', $.uglify()))
    .pipe($.if('**/*.css', $.cssmin()))
    .pipe($.if('!**/*.php', $.rev()))
    .pipe($.revReplace({replaceInExtensions: ['.php', '.js', '.css']}))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.rev.manifest())
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
});

gulp.task('build', ['assets'], function() {
  return gulp.src(path.join(conf.paths.dist, '/**/*.php'))
    .pipe($.replace(reScripts, '<script async src="<?php echo BASEURL; ?>/'))
    .pipe($.replace(reStyles, '<link rel="stylesheet" href="<?php echo BASEURL; ?>/'))
    .pipe($.replace(reRest, '<?php echo BASEURL; ?>'))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
});

gulp.task('other', function () {
  return gulp.src([
    path.join(conf.paths.src, '/*.*'),
    path.join('!' + conf.paths.src, '/*.{php,zip,sql*}')
  ])
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('assets', ['svg'], function () {
  return gulp.src(path.join(conf.paths.tmp, 'assets/**/*'))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/assets')))
});

gulp.task('cleanFooter', ['compile'], function() {
  return $.del(path.join(conf.paths.dist, '/footers'));
});

gulp.task('clean', function () {
  return $.del([
    path.join(conf.paths.dist, '/'),
    path.join(conf.paths.tmp, '/'),
    path.join(conf.paths.src, '/footer*.php')<% if (gulpUseSvgSprites) { %>,
    path.join(conf.paths.src, '/scss/_sprite.scss')<% } %>,
    path.join(conf.paths.src, '/critical')
  ]);
});