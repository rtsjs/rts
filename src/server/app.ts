'use strict';
import express = require('express');
import bodyParser = require('body-parser');
import favicon = require('serve-favicon');
import logger = require('morgan');
import apiRouter = require("./api/router");

var port = process.env.PORT || 8001;
var app = express();
var environment = process.env.NODE_ENV;

// Todo: Need a favorite icon
//app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.use("/api", apiRouter);
app.get('/api/bug', function(req, res) {
    res.send('hello bug');
});

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