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
        res.send(data);
    });
});

router.get("/task/:id", (req:any, res:any) => {
    res.send("Sending task " + req.params.id);
});


router.post("/addTask", (req:any, res:any) => {
    var tasks = new Tasks.Tasks();
    tasks.addTask(__dirname + '/inputTasks.json', req.body, function(data){
        res.send(data);
    });
});

router.post("/updateTask", (req:any, res:any) => {
    var tasks = new Tasks.Tasks();
    tasks.updateTask(__dirname + '/inputTasks.json', req.body, function(data){
        res.send(data);
    });
});

router.post("/deleteTask", (req:any, res:any) => {
    var tasks = new Tasks.Tasks();
    tasks.deleteTask(__dirname + '/inputTasks.json', req.body, function(data){
        res.send(data);
    });
});

export = router;