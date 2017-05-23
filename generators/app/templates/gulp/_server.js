'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var util = require('util');

function browserSyncInit() {
  browserSync.instance = browserSync.init({
    proxy: conf.paths.proxy,
    debugInfo: true,
    open: true
  });
}

gulp.task('watch', ['watching'], function () {
  browserSyncInit();
});
