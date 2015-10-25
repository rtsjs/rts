'use strict';
import express = require('express');
import Tasks = require('./Tasks');

var router = express.Router();

router.get("/test", (req:any, res:any) => {
    res.send("Test router express change ");
});


router.get("/task", (req:any, res:any) => {

    var tasks = new Tasks.Tasks();
    tasks.getTasks(__dirname + '/inputTasks.json', function(data) {
        //res.sendStatus(503);
        res.send(data);
    });

    //res.send(result );
});

router.get("/task/:id", (req:any, res:any) => {
    res.send("Sending task " + req.params.id);
});


export = router;