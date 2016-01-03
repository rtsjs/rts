/**
 * Created by Home on 1/1/2016.
 */
import PriorityQ=require('./PriorityQ')

export class Scheduler {
    private priorityQ:any;
    private taskIntervals:Array<number> = [];
    private popInterval:number = 0;

    constructor() {
        this.priorityQ = new PriorityQ.PriorityQ(function (a:any, b:any) {
            return a.p < b.p;
        });
    }

    AddPeriodicTask(task:any, period:number) {
        var intervalID = setInterval(()=> {
            this.priorityQ.push({t: task, p: period});
        }, period); // Execute task every <period> milliseconds.
        this.taskIntervals.push(intervalID)
    }

    Run(period:number) {
        var intervalID = setInterval(() => {
            var element = this.priorityQ.pop();
            if (typeof element != 'undefined') {
                element.t.execute();
            }
        }, period);
        this.popInterval = intervalID;
    }

    Stop() {
        for (var intervalID in this.taskIntervals) {
            clearInterval(intervalID);
        }
        clearInterval(this.popInterval);
    }
}
