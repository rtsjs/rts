module.exports = PriorityQueue;

var _map;

function PriorityQueue(comparer) {
    _map = new Map();
}



PriorityQueue.prototype.queue = function (task) {
    _map.set(task, task);
};

PriorityQueue.prototype.length = function () {

    return _map.size;
};

PriorityQueue.prototype.peek = function () {


};


