/**
 * Created by Home on 10/10/2015.
 */
//constructor
function Scheduler(){
    this._priorityQ = new PriorityQ(function (a, b) {
        return a.p < b.p;
    });
    this._taskIntervals = [];
    this._popInterval = 0;
}

Scheduler.prototype.AddPeriodicTask = function(task,period){
    var intervalID = setInterval( (function () {
        this._priorityQ.push({t:task,p:period});
    }).bind(this), period); // Execute task every <period> milliseconds.
    this._taskIntervals.push(intervalID)
}

Scheduler.prototype.Run = function(period){
    var intervalID = setInterval( (function(){
        var element = this._priorityQ.pop();
        if (typeof element != 'undefined') {
            element.t.execute();
        }
    }).bind(this),period);
    this._popInterval = intervalID;
}

Scheduler.prototype.Stop = function(){
    for (var intervalID in this._taskIntervals){
        clearInterval(intervalID);
    }
    clearInterval(this._runInterval)
}