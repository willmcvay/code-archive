const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserify = require('browserify');
const fs = require('fs');
const uglify = require('gulp-uglify');
const mocha = require('gulp-mocha');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

gulp.task('build', function () {
  browserify('js/app/client.js')
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .pipe(fs.createWriteStream('public/js/app.js'));
});

gulp.task('sass', function () {
  gulp.src('scss/style.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
    .pipe(gulp.dest('public/css'));
});

gulp.task('server', function () {
  nodemon({
    script: 'js/app/server.js',
    ignore: ['public'],
    ext: 'js html hbs scss',
    tasks: ['build', 'sass']
  });
});

