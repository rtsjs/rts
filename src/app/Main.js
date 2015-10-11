$(function () {
    /*
    var data = [10, 9, 8908, 7, 4, 6, 4, 500, 4, 3, 2, 1];
    var pq = new PriorityQ(function (a, b) {
        return a < b
    });

    for (var i = 0; i < data.length; i++) {
        pq.push(data[i]);
    }

    for (var j = 0; j < data.length; j++) {
        //document.writeln(pq.peek());
        var head = pq.pop();
        document.writeln(head);
        console.log(head);

    }
    var testTask = new TestTask(10*1000);
    testTask.execute();
    */
    var scheduler = new Scheduler();
    scheduler.AddPeriodicTask(
        new TestTask(1000),2000
    )
    scheduler.Run(1000)
}());