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
}

