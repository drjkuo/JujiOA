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
var babel = require('gulp-babel'),
htmlreplace = require('gulp-html-replace'),
minifyHTML  = require('gulp-minify-html');

gulp.task('uglify', function() {
  return gulp.src('./assets/js/*.js')
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
  .pipe(gulp.dest('./build/assets/js/'));
});

gulp.task('html-replace',function() {
  var opts = {comments:false,spare:false,quotes:true};
  return gulp.src('./*.html')
    .pipe(htmlreplace({
        // 'css': 'css/all.min.css',
        'js': 'js/main.min.js'
    }))
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./build'));
});


gulp.task('default',['html-replace', 'uglify']);


// gulp.task('default',['webserver']);
