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
                console.log(err);
                return cb(err,null);
            }
            var json;
            try
            {
                json = JSON.parse(data);
            } catch(e){
                console.log(e);
                return cb(e,null);
            }
            json["tasks"].push(task);
            fs.writeFile(path, JSON.stringify(json, null, 4), function (err) {
                if(err){
                    console.log(err);
                    return cb(err);
                }
                cb(data);
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
                console.log(e);
                return cb(e);
            }

            json["tasks"].forEach(function(result, index) {
                if (result['id'] === task.id) {
                    result['name'] = task.name;
                    result['executionTime'] = task.executionTime;
                    result['period'] = task.period;
                }
            });

            console.log("writing to file");
            fs.writeFile(path, JSON.stringify(json, null, 4), function (err) {
                if(err){
                    return cb(err);
                }
                cb(data);
            });
        });
    }

    deleteTask(path:string, id:any, cb:any) {

        console.log("deleting task");
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                return cb(err, null);
            }
            var json;

            try
            {
                console.log("parse data");
                json = JSON.parse(data);
            } catch(e){
                return cb(e);
            }

            console.log("task id =" + id);
            var ret = Tasks.contains(json["tasks"], id);
            if (!ret){
                console.log("task does not exist");
                return cb("error: task does not exist");
            }

            json["tasks"].forEach(function(result, index) {
                if(result['id'] === id) {
                    json["tasks"].splice(index, 1);
                }
            });

            fs.writeFile(path, JSON.stringify(json, null, 4), function (err) {
                if(err){
                    return cb(err);
                }
                cb(data);
            });
        });
    }

    private static contains(data:any, id:any) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == id){
                return true;
            }
        }

        return false;
    }
}