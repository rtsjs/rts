var Queue = require('./proto/queue.js');
var Tasks = require('./proto/tasks.js');

//import {Queue} from './proto/queue.js'

/*
var testQueue = new Queue('placeholder');

testQueue.mapper();
*/

var tasks = new Tasks();
tasks.getTask(__dirname + '/tasks.json', function(data) {
    console.log(data);
});

