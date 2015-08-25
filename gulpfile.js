var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var gulpDocs = require('gulp-ngdocs');
var browserSync = require('browser-sync').create();
var ghPages = require('gulp-gh-pages');

gulp.task('clean', function () {
    return gulp
        .src(['dist', 'docs'], {read: false})
        .pipe(rimraf());
});

gulp.task('ngdocs', ['clean'], function () {
    var options = {
        loadDefaults: {
            angular: false,
            angularAnimate: false,
            marked: false,
            prettify: false
        },
        scripts: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/marked/lib/marked.js',
            'node_modules/angular/angular.min.js',
            'node_modules/angular/angular.min.js.map',
            'node_modules/angular-animate/angular-animate.min.js',
            'node_modules/angular-animate/angular-animate.min.js.map',
            'src/focus.js'],
        html5Mode: false
    }

    return gulp
        .src('src/*.js')
        .pipe(gulpDocs.process(options))
        .pipe(gulp.dest('./docs'));
});

gulp.task('deploy', function () {
    return gulp
        .src('docs/**/*')
        .pipe(ghPages());
});

gulp.task('serve', ['ngdocs'], function (done) {
    browserSync.init({
        server: "./docs"
    });

    gulp.watch("src/**/*", ['ngdocs']);
    gulp.watch("docs/**/*").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
