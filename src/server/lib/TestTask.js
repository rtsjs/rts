/**
 * Created by Home on 1/1/2016.
 */
var Log = require('../api/RTSLog');
var TestTask = (function () {
    //Constructor for task
    function TestTask(duration) {
        this.duration = duration;
    }
    TestTask.prototype.execute = function () {
        var time0 = Date.now();
        while (true) {
            var time1 = Date.now();
            var elapsed = time1 - time0;
            if (elapsed >= this.duration)
                break;
        }
        var msg = "Test task started at: " + time0 + " ran for: " + elapsed;
        console.log(msg);
        Log.log.info(msg);
    };
    return TestTask;
})();
exports.TestTask = TestTask;

//# sourceMappingURL=TestTask.js.map
