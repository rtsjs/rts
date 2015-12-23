'use strict';
import fs = require('fs');

export class Tasks {
    tasks:any;

    constructor(){
        //_tasks = null;
    }

    getTasks(path:string, cb:any) {
        console.log("Path=" + path);
        //return path;
        fs.readFile(path, 'utf8', function (err, data) {
/*
            if (this._tasks !== null) {
                return this._tasks;
            }
*/
            if (err) {
                return cb(err);
            }
            cb(data);
        })
    }

    addTask(path:string, task:any, cb:any) {

        fs.readFile(path, 'utf8', function (err, data) {
            if (err){
                return cb(err,null);
            }
            var json;
            try
            {
                json = JSON.parse(data);
            } catch(e){
                return cb(e,null);
            }
            var ret = Tasks.contains(json["tasks"], task.name);
            if (ret){
                return cb("error: task exists");
            }
            json["tasks"].push(task);
            fs.writeFile(path, JSON.stringify(json, null, 4), function (err) {
                if(err){
                    return cb(err);
                }
                cb("success");
            });
        });
    }

    updateTask(path:string, task:any, cb:any) {

        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                return cb(err, null);
            }
            var json;

            try {
                json = JSON.parse(data);
            } catch (e) {
                return cb(e);
            }

            var ret = Tasks.contains(json["tasks"], task.name);
            if (!ret) {
                return cb("error: task does not exist");
            }

            json["tasks"].forEach(function(result, index) {
                if(result['name'] === task.name) {
                    result['name'] = task.name;
                    result['executionTime'] = task.executionTime;
                    result['period'] = task.period;
                }
            });

            fs.writeFile(path, JSON.stringify(json, null, 4), function (err) {
                if(err){
                    return cb(err);
                }
                cb("success");
            });
        });
    }

    deleteTask(path:string, task:any, cb:any) {

        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                return cb(err, null);
            }
            var json;

            try
            {
                json = JSON.parse(data);
            } catch(e){
                return cb(e);
            }

            var ret = Tasks.contains(json["tasks"], task.name);
            if (!ret){
                return cb("error: task does not exist");
            }

            json["tasks"].forEach(function(result, index) {
                if(result['name'] === task.name) {
                    json["tasks"].splice(index, 1);
                }
            });

            fs.writeFile(path, JSON.stringify(json, null, 4), function (err) {
                if(err){
                    return cb(err);
                }
                cb("success");
            });
        });
    }

    private static contains(data:any, name:any) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].name == name){
                return true;
            }
        }

        return false;
    }
}

