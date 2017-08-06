var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
  gulp.src('./')
  .pipe(webserver({
    port:3000,
    livereload: true,
    directoryListing: false,
    open: true,
    // fallback: 'index.html'
  }));
});

var concat     = require('gulp-concat'),
minifyCSS  = require('gulp-minify-css'),
uglify     = require('gulp-uglify'),
rename     = require("gulp-rename");
var gutil = require('gulp-util');
var strip = require('gulp-strip-comments');
var babel = require('gulp-babel')

gulp.task('uglify', function() {
  return gulp.src('./scripts/*.js')
  .pipe(babel({
        presets: ['es2015']
    }))
  .pipe(strip())
  .pipe(uglify())
  .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
  .pipe(rename(function(path) {
    path.basename += ".min";
    path.extname = ".js";
  }))
  .pipe(gulp.dest('./build/js/'));
});


gulp.task('default',['uglify']);


// gulp.task('default',['webserver']);
