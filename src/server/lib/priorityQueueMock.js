module.exports = PriorityQueueMock;

var _map;

function PriorityQueueMock(comparer) {
    _map = new Map();
}



PriorityQueueMock.prototype.queue = function (task) {
    _map.set(task, task);
};

PriorityQueueMock.prototype.length = function () {

    return _map.size;
};

PriorityQueueMock.prototype.peek = function () {


};


