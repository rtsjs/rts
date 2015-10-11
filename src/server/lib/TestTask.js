/**
 * Created by Home on 10/9/2015.
 */
//Constructor for task
function TestTask(duration) {
    this._duration = duration;
}
//Augment the prototype with execute method
TestTask.prototype.execute = function() {
    var time0 = Date.now();
    console.log(time0)
    while (true) {
        var time1 = Date.now();
        var elapsed = time1-time0;
        if (elapsed >= this._duration)
            break;
    }
    console.log(elapsed);
}

