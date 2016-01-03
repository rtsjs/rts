/**
 * Created by Home on 1/1/2016.
 */
var PriorityQ = require('./PriorityQ');
var Scheduler = (function () {
    function Scheduler() {
        this.taskIntervals = [];
        this.popInterval = 0;
        this.priorityQ = new PriorityQ.PriorityQ(function (a, b) {
            return a.p < b.p;
        });
    }
    Scheduler.prototype.AddPeriodicTask = function (task, period) {
        var _this = this;
        var intervalID = setInterval(function () {
            _this.priorityQ.push({ t: task, p: period });
        }, period); // Execute task every <period> milliseconds.
        this.taskIntervals.push(intervalID);
    };
    Scheduler.prototype.Run = function (period) {
        var _this = this;
        var intervalID = setInterval(function () {
            var element = _this.priorityQ.pop();
            if (typeof element != 'undefined') {
                element.t.execute();
            }
        }, period);
        this.popInterval = intervalID;
    };
    Scheduler.prototype.Stop = function () {
        for (var intervalID in this.taskIntervals) {
            clearInterval(intervalID);
        }
        clearInterval(this.popInterval);
    };
    return Scheduler;
})();
exports.Scheduler = Scheduler;

//# sourceMappingURL=Scheduler.js.map
