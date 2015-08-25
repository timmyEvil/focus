var gulp = require('gulp');
var connect = require('connect');
var rimraf = require('gulp-rimraf');
var serveStatic = require('serve-static');
var gulpDocs = require('gulp-ngdocs');
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

gulp.task('default', ['ngdocs'], function (done) {
    connect()
        .use(serveStatic('./docs'))
        .listen(8000);
    done();
    console.log('Server started on http://localhost:8000');
});
