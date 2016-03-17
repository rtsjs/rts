/**
 * Created by Home on 1/1/2016.
 */
import Log = require('../api/RTSLog')
import RtsIo = require("../api/io");
export class TestTask {
//Constructor for task

    public name:string;

    constructor(public name:string, public duration:number) {
        this.name = name;
    }

    execute() {
        var time0 = Date.now();
        while (true) {
            var time1 = Date.now();
            var elapsed = time1 - time0;
            if (elapsed >= this.duration)
                break;
        }
        var msg = this.name + " started at: " + time0 + " ran for: " + elapsed;
        console.log(msg);
        Log.log.info(msg);
        RtsIo.io.emit('Task data',msg);
    }
}
