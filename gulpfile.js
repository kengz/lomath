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
var srcPath = __dirname + '/chart/src';
var buildPath = __dirname + '/chart/build';


///////////////////////
// Dynamic plotting: //
///////////////////////
// watching the .js file in workpath and replot when saved.
// the workpath to look for change for dynplot
var workpath = './run.js'

// gulp wrapper fot exporting
gulp.task('dynplot', function(){

    // main tasks for dynamic plot
    gulp.task('dyn', ['exec', 'wrapbrowserify', 'inject', 'injectlib', 'reload', 'plotwatch', 'jswatch'])

    // watch for file changes in srcPath
    gulp.task('plotwatch', ['reload'], function() {
        gulp.watch([srcPath + '/**/*'], ['browserify', 'reload'])
    })

    // watch for file changes in workpath .js
    gulp.task('jswatch', ['reload'], function(){
        return gulp.watch(workpath, ['exec'])
    })

    // wrap browserify task to wait for exec
    gulp.task('wrapbrowserify', ['exec'], function(){
        gulp.start('browserify')
    })

    // exec the node file first before reload
    gulp.task('exec', function() {
        var cp = require('child_process');
        console.log("workpath", workpath)
        return cp.exec('node ' + workpath, function(error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            return gulp.src('./*.js')
        })
    })

    // starting it
    gulp.start('dyn');

})
// // export for normal render run
// function dyngulpplot(){
//     // workpath = workpath;
//     gulp.start('dynplot');
// }
// exports.dyngulpplot = dyngulpplot;




/////////////////////
// Normal plotting //
/////////////////////

// gulp top level tasks
gulp.task('default', ['start']);
gulp.task('start', ['browserify', 'inject', 'injectlib', 'reload', 'watch']);

// alias for repeating tasks
// gulp.task('seq', ['eval', 'browserify', 'reload']);
gulp.task('seq', ['browserify', 'reload']);

// watch for file changes in srcPath
gulp.task('watch', ['reload'], function() {
    gulp.watch(srcPath + '/**/*', ['seq'])
})

// browserify all js files into a single bundle.js
gulp.task('browserify', function(callback) {
    var bundledStream = through();

    bundledStream
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(buildPath + '/js'))
    .on('end', function() {
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

// inject all the library js files
gulp.task('injectlib', function() {
    // vanilla lib js files; not browserified; just written to lib
    return gulp.src(srcPath + '/lib/*.js')
    .pipe(gulp.dest(buildPath + '/lib'))
})

// Injecting browserified js script tag into html
gulp.task('inject', ['browserify', 'injectlib'], function() {
    var target = gulp.src(srcPath + '/index.html');
    // the libraries, ordered with jquery first
    var lib = gulp.src([srcPath + '/lib/jquery*.js', srcPath + '/lib/highcharts*.js', srcPath + '/lib/*.js'], {
        read: false
    });
    // the source js files
    var jssource = gulp.src([buildPath + '/js/*.js'], {
        read: false
    });
    // the highchart options
    var options = gulp.src(srcPath + '/options.json');

    return target
        // inject library tags
        .pipe(inject(lib, {
            name: 'head',
            relative: true
        }))
        // inject script tags
        .pipe(inject(jssource, {
            relative: true
        }))
        // inject div tags for each plot
        .pipe(inject(options, {
            starttag: '<!-- inject:div -->',
            transform: function(filepath, file, i, length) {
                // the number of charts
                var chartNum = JSON.parse(file.contents.toString('utf8')).length;
                // template strings
                var left = '<div id="hchart',
                right = '" style="width:100%; height:400px;"></div>\n',
                str = '';
                for (var i = 0; i < chartNum; i++) {
                    str += (left + i + right);
                }

                return str;
            }
        }))
        // finally write to output
        .pipe(gulp.dest(buildPath))
    })



// Reloading browserSync
gulp.task('reload', ['browserify'], reload);

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
            baseDir: __dirname,
            directory: true
        },
        startPath: 'chart/build/index.html',
        browser: "google chrome",
        logPrefix: 'SERVER'
    };
    browserSync.init(serverConfig, defer.resolve);

    return defer.promise;
}
// export for normal render run
function gulpplot(){
    gulp.start('default');
}
exports.gulpplot = gulpplot;





gulp.task('doc', ['rebuild','reload2', 'docwatch']);

gulp.task('docwatch', function(){
    gulp.watch('./index.js', ['rebuild', 'reload2']);
})
var cp = require('child_process');

gulp.task('rebuild', function(){
  return cp.exec('./node_modules/dokker/bin/dokker', function(error, stdout, stderr) {
      if (error !== null) {
          console.log('exec error: ' + error);
      }
        return gulp.src('./*.js')
  })

})
// Reloading browserSync
gulp.task('reload2', ['rebuild'], reload2);

// reload browserSync
function reload2() {
    var defer = q.defer();
    setTimeout(function () {

    if (browserSync.active) {
        browserSync.reload();
        defer.resolve();
    } else
    startServer2().then(defer.resolve);

  }, 1000);
    return defer.promise;
}

// start a browserSync server to index.html directly
function startServer2() {
    var defer = q.defer();

    var serverConfig = {
        server: {
            baseDir: 'docs',
            directory: true
        },
        startPath: 'index.html',
        logPrefix: 'SERVER'
    };
    browserSync.init(serverConfig, defer.resolve);

    return defer.promise;
}
