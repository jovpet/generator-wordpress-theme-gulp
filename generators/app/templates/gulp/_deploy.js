
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var fs = require('fs');
var remoteConnection = JSON.parse(fs.readFileSync('./remote.json'));

// var remoteConnection = require('./remote.json');
var ftp = require('vinyl-ftp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

var conn = ftp.create( {
  host:     remoteConnection.host,
  user:     remoteConnection.user,
  password: remoteConnection.password,
  port:     remoteConnection.port,
  parallel: remoteConnection.parallel,
  reload:   true,
  log:      console.log
});

var globs = [conf.paths.dist];

gulp.task( 'deploy', ['build'], function () {
  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance

  return gulp.src( globs, { base: path.join('./', conf.paths.dist), buffer: false } )
    .pipe( conn.dest( remoteConnection.remotePath ) );
});

gulp.task( 'deploy:newer', ['build'], function () {
  return gulp.src( globs, { base: path.join('./', conf.paths.dist), buffer: false } )
    .pipe( conn.newer( remoteConnection.remotePath ) );
});