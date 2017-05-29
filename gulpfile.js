'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var browserSync = require('browser-sync').create();

const debug = require('gulp-debug');


gulp.task('serve', function(done) {

    browserSync.init({
        server: './dist'
    });

    gulp.watch('./src/styles/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/html/*.html', gulp.series('html','browserSync:reload') )/*.on('change', browserSyncChanger)*/;
    done();
});

gulp.task('browserSync:reload', function (done) {
  browserSync.reload();
  done();
});


gulp.task('sass', function () {
 return gulp.src('./src/styles/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
  	outputStyle:"compressed",
  	includePaths: []
  }).on('error', sass.logError))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('./dist/css'))
  .pipe(browserSync.stream());
});


gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', gulp.series('sass'));
});

gulp.task('html', function() {
  return gulp.src('./src/html/**/*.html', {since: gulp.lastRun('assets')})
      .pipe(debug({title: 'html'}))
      .pipe(gulp.dest('dist'));
});

gulp.task('assets', function() {
  return gulp.src('./src/html/*.html', {since: gulp.lastRun('assets')})
      .pipe(debug({title: 'html'}))
      .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('html','serve'));