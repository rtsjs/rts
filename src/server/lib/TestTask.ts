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

        var json = JSON.stringify({Task:this.name, Started:time0, Ran:elapsed}, null, 4);
        console.log(json);
        Log.log.info(json);
        RtsIo.io.emit('Task data',json);
    }
}
