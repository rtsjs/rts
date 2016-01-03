'use strict';
var express = require('express');
var Tasks = require('./Tasks');
var router = express.Router();
router.get("/test", function (req, res) {
    res.send("Test router express change ");
});
router.get("/task", function (req, res) {
    var tasks = new Tasks.Tasks();
    tasks.getTasks(__dirname + '/inputTasks.json', function (data) {
        res.send(data);
    });
});
router.get("/task/:id", function (req, res) {
    res.send("Sending task " + req.params.id);
});
router.post("/addTask", function (req, res) {
    var tasks = new Tasks.Tasks();
    tasks.addTask(__dirname + '/inputTasks.json', req.body, function (data) {
        res.send(data);
    });
});
router.post("/updateTask", function (req, res) {
    var tasks = new Tasks.Tasks();
    tasks.updateTask(__dirname + '/inputTasks.json', req.body, function (data) {
        res.sendStatus(200);
    });
});
router.post("/deleteTask", function (req, res) {
    var tasks = new Tasks.Tasks();
    tasks.deleteTask(__dirname + '/inputTasks.json', req.body, function (data) {
        res.sendStatus(200);
    });
});
module.exports = router;

//# sourceMappingURL=router.js.map
