'use strict';
var express = require('express');
var Tasks = require('./Tasks');
var simulation_1 = require("./simulation");
var router = express.Router();
router.get("/test", function (req, res) {
    res.send("Test router express change ");
});
router.get("/start", function (req, res) {
    var simulation = new simulation_1.Simulation();
    simulation.start(__dirname + '/inputTasks.json');
    res.end("Simulation started ");
});
router.get("/task", function (req, res) {
    console.log("Router: Get tasks");
    var tasks = new Tasks.Tasks();
    tasks.getTasks(__dirname + '/inputTasks.json', function (data) {
        res.send(data);
    });
});
router.get("/task/:id", function (req, res) {
    res.send("Sending task " + req.params.id);
});
router.post("/task", function (req, res) {
    console.log("Router: Add task");
    var tasks = new Tasks.Tasks();
    tasks.addTask(__dirname + '/inputTasks.json', req.body, function (data) {
        res.end(data);
    });
});
router.put("/task/:id", function (req, res) {
    req.params.id = req.params.id.slice(1);
    var tasks = new Tasks.Tasks();
    tasks.updateTask(__dirname + '/inputTasks.json', req.body, function (data) {
        res.end(data);
    });
});
router.patch("/task/:id", function (req, res) {
    req.params.id = req.params.id.slice(1);
    var tasks = new Tasks.Tasks();
    tasks.updateTask(__dirname + '/inputTasks.json', req.body, function (data) {
        res.end(data);
    });
});
router.delete("/task/:id", function (req, res) {
    req.params.id = req.params.id.slice(1);
    var tasks = new Tasks.Tasks();
    tasks.deleteTask(__dirname + '/inputTasks.json', req.params.id, function (data) {
        res.end(data);
    });
});
module.exports = router;

//# sourceMappingURL=router.js.map
