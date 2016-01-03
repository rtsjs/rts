/**
 * Created by Home on 1/2/2016.
 */
import fs = require('fs')
import Log = require('log');
export var log = new Log('debug', fs.createWriteStream('my.log'));
