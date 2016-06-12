const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');

gulp.task('lint', () => {
	return gulp.src(['**/*.js', '**/*.jsx', '!node_modules/**', '!client/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('webpack', () => {
	return gulp.src('client/app/client.js')
    .pipe(webpack( require('./webpack.config.js') ))
		.pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('sass', () => {
	gulp.src('scss/style.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('make', ['lint'], () => {
	gulp.start(['webpack', 'sass']);
});

gulp.task('default', () => {
	nodemon({
		script: 'server.js',
		ignore: ['dist/js/app.js', 'client/**/*.js', 'client/**/*.jsx'],
		ext: 'js html',
		tasks: ['sass']
	});
	gulp.watch('sass/**/*.scss',['sass']);
});
