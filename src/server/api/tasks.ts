'use strict';
import fs = require('fs');

export class Tasks {
    tasks:any;

    constructor(){
        //_tasks = null;
    }

    getTasks(path:string, cb:any) {
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

    addTask(path:string,task:any, cb:any){
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

            var ret = Tasks.contains(task,json["tasks"]);
            if (ret==true){
                return cb("task exists");
            }

            json["tasks"].push(task);

            fs.writeFile(path, JSON.stringify(json), function (err) {
                if(err){
                    return cb(err);
                }
                cb("success");
            });
        });
    }

    deleteTask(path:string,task:any, cb:any){
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

            var ret = Tasks.contains(task,json["tasks"]);
            if (ret==false){
                return cb("task does not exist");
            }

            json["tasks"].pop(task);

            fs.writeFile(path, JSON.stringify(json), function (err) {
                if(err){
                    return cb(err);
                }
                cb("success");
            });
        });
    }

    private static contains(task:any, data:any) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].name == task.name) {
                return true;
            }
        }

        return false;
    }
}

