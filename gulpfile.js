var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var KarmaServer = require('karma').Server;
var gulpDocs = require('gulp-ngdocs');
var browserSync = require('browser-sync').create();
var ghPages = require('gulp-gh-pages');

gulp.task('clean', function () {
    return gulp
        .src(['dist', 'docs'], {read: false})
        .pipe(rimraf());
});

gulp.task('test', function (done) {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('tdd', function (done) {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

gulp.task('default', ['tdd']);

gulp.task('ngdocs', ['clean'], function () {
    var options = {
        loadDefaults: {
            angular: false,
            angularAnimate: false,
            marked: false,
            prettify: false
        },
        scripts: [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/marked/lib/marked.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-animate/angular-animate.js',
            'src/focus.js'],
        html5Mode: false
    }

    return gulp
        .src('src/*.js')
        .pipe(gulpDocs.process(options))
        .pipe(gulp.dest('./docs'));
});

gulp.task('deploy-docs', function () {
    return gulp
        .src('docs/**/*')
        .pipe(ghPages());
});

gulp.task('serve-docs', ['ngdocs-docs'], function (done) {
    browserSync.init({
        server: "./docs"
    });

    gulp.watch("src/**/*", ['ngdocs']);
    gulp.watch("docs/index.html").on('change', browserSync.reload);
});

gulp.task('default', ['tdd']);
