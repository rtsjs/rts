"use strict";
var fs = require('fs');
module.exports = Tasks;

function Tasks() {
    this._tasks = null;
}

Tasks.prototype.getTask = function (path, cb) {
    if (this._tasks !== null) {
        return this._tasks;
    }
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            return cb(err);
        }
        cb(data);
    })
};

