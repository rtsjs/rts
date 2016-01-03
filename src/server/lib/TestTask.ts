/**
 * Created by Home on 1/1/2016.
 */
import Log = require('../api/RTSLog')
export class TestTask {
//Constructor for task

    constructor(public duration:number) {
    }

    execute() {
        var time0 = Date.now();
        while (true) {
            var time1 = Date.now();
            var elapsed = time1 - time0;
            if (elapsed >= this.duration)
                break;
        }
        var msg = "Test task started at: " + time0 + " ran for: " + elapsed
        console.log(msg)
        Log.log.info(msg)
    }
}
