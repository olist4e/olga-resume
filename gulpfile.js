'use strict';

var gulp = require('gulp');
var del = require('del');


var path = require('path');

var sourcemaps = require('gulp-sourcemaps');


// Load plugins
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');


// Styles
gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10,
            loadPath: ['app/bower_components'],
            compass:true
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('dist/styles'))
        .pipe($.size());
});

// gulp.src('./scss/*.scss')
//   .pipe(sourcemaps.init())
//     .pipe(sass())
//   .pipe(sourcemaps.write('./maps'))
//   .pipe(gulp.dest('./css'));





// Scripts
gulp.task('scripts', function () {
    return browserify('./app/scripts/app.js')
            .bundle()
            .pipe(source('app.js'))
            .pipe(gulp.dest('dist/scripts'))
});



gulp.task('jade', function () {
    return gulp.src('app/template/*.jade')
        .pipe($.jade({ pretty: true }))
        .pipe(gulp.dest('dist'));
})



// HTML
gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

// Images
gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});



gulp.task('jest', function () {
    var nodeModules = path.resolve('./node_modules');
    return gulp.src('app/scripts/**/__tests__')
        .pipe($.jest({
            scriptPreprocessor: nodeModules + '/gulp-jest/preprocessor.js',
            unmockedModulePathPatterns: [nodeModules + '/react']
        }));
});



// Clean
gulp.task('clean', function (cb) {
    del(['dist/styles', 'dist/scripts', 'dist/images'], cb);
});


// Bundle
gulp.task('bundle', ['styles', 'scripts', 'bower'], function(){
    return gulp.src('./app/*.html')
               .pipe($.useref.assets())
               .pipe($.useref.restore())
               .pipe($.useref())
               .pipe(gulp.dest('dist'));
});

// Build
gulp.task('build', ['html', 'bundle', 'images']);

// Default task
gulp.task('default', ['clean', 'build', 'jest' ]);

// Webserver
gulp.task('serve', function () {
    gulp.src('dist')
        .pipe($.webserver({
            livereload: true,
            port: 9000
        }));
});

// Bower helper
gulp.task('bower', function() {
    gulp.src('app/bower_components/**/*.js', {base: 'app/bower_components'})
        .pipe(gulp.dest('dist/bower_components/'));

});

gulp.task('json', function() {
    gulp.src('app/scripts/json/**/*.json', {base: 'app/scripts'})
        .pipe(gulp.dest('dist/scripts/'));
});


// Watch
gulp.task('watch', ['html', 'bundle', 'serve'], function () {

    // Watch .json files
    gulp.watch('app/scripts/**/*.json', ['json']);

    // Watch .html files
    gulp.watch('app/*.html', ['html']);

    
    // Watch .scss files
    gulp.watch('app/styles/**/*.scss', ['styles']);
    


    // Watch .jade files
    gulp.watch('app/template/**/*.jade', ['jade', 'html']);




    // Watch .js files
    gulp.watch('app/scripts/**/*.js', ['scripts', 'jest' ]);

    // Watch image files
    gulp.watch('app/images/**/*', ['images']);
});
