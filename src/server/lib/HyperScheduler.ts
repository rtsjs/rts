/**
 * Created by Home on 1/2/2016.
 */
'use strict';
import PriorityQ = require('./PriorityQ');
import hypertimer = require('hypertimer');

export class HyperScheduler {
    private priorityQ:any;
    private taskIntervals:Array<number> = [];
    private popInterval:number = 0;
    private timer:any;

    constructor() {
        this.priorityQ = new PriorityQ.PriorityQ(function (a:any, b:any) {
            return a.p > b.p;
        });
        this.timer = hypertimer();
    }

    AddPeriodicTask(task:any, period:number) {
        var intervalID = this.timer.setInterval(()=> {
            this.priorityQ.push({t: task, p: period});
        }, period); // Execute task every <period> milliseconds.
        this.taskIntervals.push(intervalID)
    }

    Run(period:number) {
        var intervalID = this.timer.setInterval(() => {
            var element = this.priorityQ.pop();
            if (typeof element != 'undefined') {
                element.t.execute();
            }
        }, period);
        this.popInterval = intervalID;
    }

    Stop() {
        for (var intervalID in this.taskIntervals) {
            this.timer.clearInterval(intervalID);
        }
        this.timer.clearInterval(this.popInterval);
    }
}
