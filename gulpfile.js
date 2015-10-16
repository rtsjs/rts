var gulp = require('gulp');
var browserSync = require('browser-sync');
var plug = require('gulp-load-plugins')();

var paths = require('./gulp.config.json');
var reload = browserSync.reload;

var log = plug.util.log;
var port = process.env.PORT || 8001;

gulp.task('help', plug.taskListing);

gulp.task('serve-dev', function(){
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
