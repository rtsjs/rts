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
module.exports = router;

//# sourceMappingURL=router.js.map
