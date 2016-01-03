'use strict';
import express = require('express');
import bodyParser = require('body-parser');
import favicon = require('serve-favicon');
import logger = require('morgan');
import apiRouter = require("./api/router");

var port = process.env.PORT || 8001;
var app = express();
var environment = process.env.NODE_ENV;

import Log = require('./api/RTSLog')
import Scheduler = require('./lib/Scheduler')
import TestTask = require('./lib/TestTask')
import HyperScheduler = require('./lib/HyperScheduler')
Log.log.info('Scheduler test started')

var scheduler = new HyperScheduler.HyperScheduler();
var testTask1 = new TestTask.TestTask(10);
var testTask2 = new TestTask.TestTask(20);
var testTask3 = new TestTask.TestTask(30);

scheduler.AddPeriodicTask(
    testTask1, 200
)
scheduler.AddPeriodicTask(
    testTask2, 400
)
scheduler.AddPeriodicTask(
    testTask3, 800
)
scheduler.Run(100)
setTimeout(()=>{
    scheduler.Stop();
},10000)

// Todo: Need a favorite icon
//app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.use("/api", apiRouter);
/*
app.get('/api/bug', function(req, res) {
    res.send('hello bug');
});
*/


switch (environment){
    case 'build':
        console.log('** BUILD **');
        app.use(express.static('./build/'));
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('** DEV **');
        app.use(express.static('./src/'));
        app.use(express.static('./'));
        app.use('/*', express.static('./src/index.html'));
        break;
}

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname  +
        '\nprocess.cwd = ' + process.cwd());
});