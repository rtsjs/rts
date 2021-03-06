//var Queue = require('./proto/priorityQueue.js');
//var Tasks = require('./proto/tasks.js');

//import {Queue} from './proto/priorityQueueMock.js'

//var testQueue = new Queue('placeholder');

//testQueue.mapper();

/*
var promise = new Promise(function (resolve, reject) {


});
*/

/*
var tasks = new Tasks();
tasks.getTask(__dirname + '/inputTasks.json', function(data) {
    console.log(data);
});

*/

'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var apiRouter = require("./api/router");
var port = process.env.PORT || 8001;

var environment = process.env.NODE_ENV;

// Todo: Need a favorite icon
//app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.use("/router", apiRouter);


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

