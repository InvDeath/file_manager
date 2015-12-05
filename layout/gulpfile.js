'use strict';

var gulp = require('gulp');
var rigger = require('gulp-rigger');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var prefixer = require('gulp-autoprefixer');
var browserSync = require("browser-sync");
var reload = browserSync.reload;

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

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000
};

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('styles:build', function () {
    gulp.src(path.src.styles)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('build', [
    'html:build',
    'js:build',
    'styles:build'
]);

gulp.task('watch', function () {
    gulp.watch([path.watch.html], function () {
        gulp.start('html:build')
    });
    gulp.watch([path.watch.styles], function () {
        gulp.start('styles:build')
    });
    gulp.watch([path.watch.js], function () {
        gulp.start('js:build')
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('default', ['build', 'webserver', 'watch']);