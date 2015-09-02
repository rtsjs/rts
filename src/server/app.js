//var Queue = require('./proto/priorityQueue.js');
var Tasks = require('./proto/tasks.js');

//import {Queue} from './proto/priorityQueueMock.js'

//var testQueue = new Queue('placeholder');

//testQueue.mapper();

/*
var promise = new Promise(function (resolve, reject) {


});
*/

var tasks = new Tasks();
tasks.getTask(__dirname + '/inputTasks.json', function(data) {
    console.log(data);
});



