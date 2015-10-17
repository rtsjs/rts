'use strict';
var express = require('express');

var api = express.Router();

api.get("/test", (req, res) => {
    res.send("Test api express change");
});

module.exports = api;