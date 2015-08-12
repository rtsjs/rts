var PriorityQueue = require('../../../src/server/lib/priorityQueue');
var chai = require('chai');
var expect = chai.expect,
    should = chai.should;

describe('Priority queue ', function () {
    var queue;

    beforeEach (function () {
        queue = new PriorityQueue();
    });

    it('should increment length after item added', function () {
        var task =   {
            "name": "task1",
            "priority": "2",
            "executionTime": "1",
            "period": "8"
        };
        queue.queue(task);
        expect(queue.length()).to.equal(1);
    });

});