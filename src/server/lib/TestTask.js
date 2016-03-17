/**
 * Created by Home on 1/1/2016.
 */
var Log = require('../api/RTSLog');
var RtsIo = require("../api/io");
var TestTask = (function () {
    function TestTask(name, duration) {
        this.name = name;
        this.duration = duration;
        this.name = name;
    }
    TestTask.prototype.execute = function () {
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
        RtsIo.io.emit('Task data', msg);
    };
    return TestTask;
})();
exports.TestTask = TestTask;

//# sourceMappingURL=TestTask.js.map
