'use strict';

var gulp = require('gulp');
var rigger = require('gulp-rigger');

var path = {
	build: {
		html: 'build/',
		js: 'build/js/',
		css: 'build/css/',
	},
	src: {
		html: 'src/*.html',
		js: 'src/js/main.js',
		css: 'src/css/style.scss'
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		style: 'src/style/**/*.scss'
	},
	clean: './build'
};

gulp.task('html:build', function(){
	gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html));
});

gulp.task('watch', function(){
	gulp.watch([path.watch.html], function(){gulp.start('html:build')});
	gulp.watch([path.watch.style], function(){gulp.start('style:build')});
});

gulp.task('default', ['html:build', 'watch']);