'use strict';
import express = require('express');
import Tasks = require('./Tasks');
import {Simulation} from "./simulation";

var router = express.Router();

router.get("/test", (req:any, res:any) => {
    res.send("Test router express change ");
});

router.get("/start", (req:any, res:any) => {
    var simulation = new Simulation();
    simulation.start(__dirname + '/inputTasks.json');
    res.end("Simulation started ");
});

router.get("/task", (req:any, res:any) => {
    console.log("Router: Get tasks");
    var tasks = new Tasks.Tasks();
    tasks.getTasks(__dirname + '/inputTasks.json', function(data) {
        res.send(data);
    });
});

router.get("/task/:id", (req:any, res:any) => {
    res.send("Sending task " + req.params.id);
});


router.post("/task", (req:any, res:any) => {
    console.log("Router: Add task");
    var tasks = new Tasks.Tasks();
    tasks.addTask(__dirname + '/inputTasks.json', req.body, function(data){
        res.end(data);
    });
});

router.put("/task/:id", (req:any, res:any) => {
    req.params.id = req.params.id.slice( 1 );
    var tasks = new Tasks.Tasks();
    tasks.updateTask(__dirname + '/inputTasks.json', req.body, function(data){
        res.end(data);
    });
});

router.patch("/task/:id", (req:any, res:any) => {
    req.params.id = req.params.id.slice( 1 );
    var tasks = new Tasks.Tasks();
    tasks.updateTask(__dirname + '/inputTasks.json', req.body, function(data){
        res.end(data);
    });
})

router.delete("/task/:id", (req:any, res:any) => {
    req.params.id = req.params.id.slice( 1 );
    var tasks = new Tasks.Tasks();
    tasks.deleteTask(__dirname + '/inputTasks.json', req.params.id, function(data){
        res.end(data);
    });
});

export = router;