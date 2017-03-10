// npm i -g gulp
'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var shell = require('gulp-shell');
var rename = require("gulp-rename");

var sass = require('gulp-sass');
var live_reload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    return gulp.src('templates/assets/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('templates/assets/css'))
        .pipe(live_reload());
});

gulp.task('watch', function () {
    live_reload.listen();
    gulp.watch(['templates/assets/scss/**/*.scss'], ['sass']);
});

gulp.task('default', ['sass', 'watch']);

/**
 * Build and deploy app
 */
gulp.task('build', shell.task([
    'ng build --prod'
]));

gulp.task('fix404', ['build'], function () {
    return gulp.src([
        'public/index.html'
    ])
        .pipe(rename('404.html'))
        .pipe(gulp.dest('public'));
});

gulp.task('deploy', ['fix404'], shell.task([
    'git add .',
    'git commit -am "Deploy"',
    'ggp',
    'echo "Deploy done!"'
]));

gulp.task('commit', function () {
    shell.task([
        'git add .',
        'git commit -m "Hello commit"',
        'ggp'
    ]);
});