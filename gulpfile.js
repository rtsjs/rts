var gulp = require('gulp');
var browserSync = require('browser-sync');
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

var plug = require('gulp-load-plugins')();

var paths = require('./gulp.config.json');
var tsProject = tsc.createProject('src/tsconfig.json');
var reload = browserSync.reload;

var log = plug.util.log;
var port = process.env.PORT || 8001;

gulp.task('help', plug.taskListing);


/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */

gulp.task('watch', function() {
    gulp.watch([paths.allTypeScript], ['compile-ts']);
});

gulp.task('compile-ts', function () {
    var sourceTsFiles = ['./src/typings/tsd.d.ts', paths.allTypeScript];             //path to typescript file

    var tsResult = gulp.src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));

    //tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./src/'));
        //.pipe(gulp.dest(config.tsOutputPath));
});

gulp.task('serve-dev', ['compile-ts', 'watch'], function(){
    log("serve-dev executing");
    serve({mode: 'dev'});
});



/**
 * Start the node server using nodemon.
 * Optionally start the node debugging.
 * @param  {Object} args - debugging arguments
 * @return {Stream}
 */
function serve(args) {
    var options = {
        script: paths.server + 'app.js',
        delayTime: 1,
        env: {
            'NODE_ENV': args.mode,
            'PORT': port
        },
        watch: [paths.server]
    };


/*
    var exec;
    if (args.debug) {
        log('Running node-inspector. Browse to http://localhost:8080/debug?port=5858');
        exec = require('child_process').exec;
        exec('node-inspector');
        options.nodeArgs = [args.debug + '=5858'];
    }
*/

/*
    if (args.mode === 'build') {
        gulp.watch('./src/client/app/!**!/!*.*', ['build']);
    }
*/

    return plug.nodemon(options)
        .on('start', function() {
            startBrowserSync();
        })
        //.on('change', tasks)
        .on('restart', function() {
            log('restarted!');
            setTimeout(function () {
                browserSync.reload({stream: false});
            }, 1000);
        });
}

function startBrowserSync() {

//TODO: fix missing env
/*
    log("startBrowserSync executing");
    log(env);
 */
    if (browserSync.active) {
        return;
    }

    log('Starting BrowserSync on port ' + port);
    browserSync({
        proxy: 'localhost:' + port,
        port: 5000,
        files: [paths.client + '/**/*.*'],
        ghostMode: { // these are the defaults t,f,t,t
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 1000
    });
}
