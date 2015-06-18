// dependencies
var browserify = require('browserify');
var browserSync = require('browser-sync').create();
var glob = require('glob');
var gulp = require('gulp');
var inject = require('gulp-inject');
var q = require('q');
var source = require('vinyl-source-stream');
var through = require('through2');

// file paths
var srcPath = './chart/src';
var buildPath = './chart/build';

// gulp tasks
gulp.task('default', ['start']);
gulp.task('start', ['seq', 'watch']);

// watch for file changes in srcPath
gulp.task('watch', ['seq'], function() {
    gulp.watch(srcPath + '/**/*', ['seq'])
})

// alias for repeating tasks
gulp.task('seq', ['browserify', 'inject', 'reload']);

// browserify all js files into a single bundle.js
gulp.task('browserify', function(callback) {
    var bundledStream = through();

    bundledStream
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(buildPath + '/js'))
    .on('end', function(){
        callback() //wait till bundledStream ends to callback
    })

    return glob(srcPath + '/js/*.js', function(err, entries) {
        if (err) {
            bundledStream.emit('error', err);
            return;
        };

        var b = browserify({
            entries: entries,
            debug: true
        })

        return b.bundle().pipe(bundledStream)
    })
});


// Injecting browserified js script tag into html
gulp.task('inject', ['browserify'], function() {
    var target = gulp.src(srcPath + '/index.html');
    var source = gulp.src([buildPath + '/js/*.js'], {
        read: false
    });
    return target.pipe(inject(source, {
        relative: true
    }))
    // .pipe(inject('lorem', {
    //     starttag: '<!-- inject:div -->'
    // }))
    .pipe(gulp.dest(buildPath))
})


// Reloading browserSync
gulp.task('reload', ['inject'], reload);
// reload browserSync
function reload() {
    var defer = q.defer();

    if (browserSync.active) {
        browserSync.reload();
        defer.resolve();
    } else
    startServer().then(defer.resolve);

    return defer.promise;
}
// start a browserSync server to index.html directly
function startServer() {
    var defer = q.defer();

    var serverConfig = {
        server: {
            baseDir: 'chart',
            directory: true
        },
        startPath: '/build/index.html',
        logPrefix: 'SERVER'
    };
    browserSync.init(serverConfig, defer.resolve);

    return defer.promise;
}
