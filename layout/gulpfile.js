'use strict';

var gulp = require('gulp');
var rigger = require('gulp-rigger');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var prefixer = require('gulp-autoprefixer');

var path = {
	build: {
		html: 'build/',
		js: 'build/js/',
		css: 'build/css/'
	},
	src: {
		html: 'src/*.html',
		js: 'src/js/main.js',
		styles: 'src/css/styles.scss'
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		styles: 'src/css/**/*.scss'
	},
	clean: './build'
};

gulp.task('html:build', function(){
	gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html));
});

gulp.task('styles:build', function(){
	gulp.src(path.src.styles)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(prefixer())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.css))
});

gulp.task('watch', function(){
	gulp.watch([path.watch.html], function(){gulp.start('html:build')});
	gulp.watch([path.watch.styles], function(){gulp.start('styles:build')});
});

gulp.task('default', ['html:build', 'styles:build', 'watch']);